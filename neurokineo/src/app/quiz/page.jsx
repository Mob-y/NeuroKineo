'use client'

import { useState } from 'react'
import { QUESTIONS } from '../lib/questions'
import { useRouter } from 'next/navigation'

export default function QuizPage() {
  const [etape, setEtape] = useState('chapitre')
  const [chapitreChoisi, setChapitreChoisi] = useState(null)
  const [regionChoisie, setRegionChoisie] = useState(null)
  const [zoneChoisie, setZoneChoisie] = useState(null)
  const router = useRouter()

  function choisirChapitre(key) {
    setChapitreChoisi(key)
    setEtape('region')
  }

  function choisirRegion(key) {
    setRegionChoisie(key)
    // Si tronc → pas de zone, aller directement au niveau
    if (key === 'tronc') {
      setZoneChoisie(null)
      setEtape('niveau')
    } else {
      setEtape('zone')
    }
  }

  function choisirZone(key) {
    setZoneChoisie(key)
    setEtape('niveau')
  }

  function choisirNiveau(niveau) {
    const params = new URLSearchParams({
      chapitre: chapitreChoisi,
      region: regionChoisie,
      zone: zoneChoisie || '',
      niveau: niveau.toString()
    })
    router.push(`/quiz/jouer?${params.toString()}`)
  }

  function retour() {
    if (etape === 'region') { setEtape('chapitre'); setChapitreChoisi(null) }
    else if (etape === 'zone') { setEtape('region'); setRegionChoisie(null) }
    else if (etape === 'niveau') {
      if (regionChoisie === 'tronc') { setEtape('region') }
      else { setEtape('zone'); setZoneChoisie(null) }
    }
    else router.push('/accueil')
  }

  const chapitre = chapitreChoisi ? QUESTIONS[chapitreChoisi] : null
  const region = regionChoisie && chapitre ? chapitre.regions[regionChoisie] : null
  const zone = zoneChoisie && region?.zones ? region.zones[zoneChoisie] : null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
        <button
          type="button"
          onClick={retour}
          className="bg-transparent border-none cursor-pointer text-[#1a6b8a] font-bold text-sm flex items-center gap-2"
        >
          ← Retour
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a6b8a] rounded-lg flex items-center justify-center text-lg">🧠</div>
          <span className="font-extrabold text-[#1a6b8a] text-base">NeuroKineo</span>
        </div>
        <div className="w-16" />
      </nav>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">

        {/* Fil d'ariane */}
        {etape !== 'chapitre' && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
            {chapitre && <span className="text-[#1a6b8a] font-bold">{chapitre.emoji} {chapitre.label}</span>}
            {region && <><span>›</span><span className="text-[#1a6b8a] font-bold">{region.label}</span></>}
            {zone && <><span>›</span><span className="text-[#1a6b8a] font-bold">{zone.label}</span></>}
          </div>
        )}

        {/* ÉTAPE 1 — Chapitre */}
        {etape === 'chapitre' && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-slate-800">Choisir une matière</h1>
              <p className="text-slate-400 text-sm mt-1">Sélectionne la matière à réviser</p>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(QUESTIONS).map(([key, ch]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => choisirChapitre(key)}
                  className="bg-white border-2 border-slate-200 hover:border-[#1a6b8a] hover:bg-[#e8f4f8] rounded-2xl p-5 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{ch.emoji}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-base group-hover:text-[#1a6b8a]">{ch.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{ch.description}</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-[#1a6b8a] text-xl">→</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ÉTAPE 2 — Région */}
        {etape === 'region' && chapitre && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-slate-800">Choisir une région</h1>
              <p className="text-slate-400 text-sm mt-1">Sélectionne la région anatomique</p>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(chapitre.regions).map(([key, reg]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => choisirRegion(key)}
                  className="bg-white border-2 border-slate-200 hover:border-[#1a6b8a] hover:bg-[#e8f4f8] rounded-2xl p-5 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">
                      {key === 'membre_sup' ? '💪' : key === 'membre_inf' ? '🦵' : '🫀'}
                    </span>
                    <p className="font-bold text-slate-800 text-base group-hover:text-[#1a6b8a]">{reg.label}</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-[#1a6b8a] text-xl">→</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ÉTAPE 3 — Zone (si pas tronc) */}
        {etape === 'zone' && region?.zones && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-slate-800">Choisir une zone</h1>
              <p className="text-slate-400 text-sm mt-1">Sélectionne la zone à réviser</p>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(region.zones).map(([key, z]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => choisirZone(key)}
                  className="bg-white border-2 border-slate-200 hover:border-[#1a6b8a] hover:bg-[#e8f4f8] rounded-2xl p-5 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <p className="font-bold text-slate-800 text-base group-hover:text-[#1a6b8a]">{z.label}</p>
                  <span className="text-slate-300 group-hover:text-[#1a6b8a] text-xl">→</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ÉTAPE 4 — Niveau */}
        {etape === 'niveau' && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-slate-800">Choisir un niveau</h1>
              <p className="text-slate-400 text-sm mt-1">Le niveau influence le type de questions</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => choisirNiveau(1)}
                className="bg-white border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 rounded-2xl p-5 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                      <p className="font-bold text-slate-800">Niveau 1</p>
                      <span className="text-xs bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">Facile</span>
                    </div>
                    <p className="text-slate-400 text-xs">QCM — 4 choix de réponses</p>
                  </div>
                  <span className="text-slate-300 text-xl">→</span>
                </div>
              </button>

              <button
                type="button"
                disabled
                className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-left opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      <p className="font-bold text-slate-800">Niveau 2</p>
                      <span className="text-xs bg-amber-100 text-amber-600 font-bold px-2 py-0.5 rounded-full">Moyen</span>
                      <span className="text-xs bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full">Bientôt</span>
                    </div>
                    <p className="text-slate-400 text-xs">QCM avec images</p>
                  </div>
                  <span className="text-slate-300 text-xl">→</span>
                </div>
              </button>

              <button
                type="button"
                disabled
                className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-left opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                      <p className="font-bold text-slate-800">Niveau 3</p>
                      <span className="text-xs bg-red-100 text-red-500 font-bold px-2 py-0.5 rounded-full">Difficile</span>
                      <span className="text-xs bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full">Bientôt</span>
                    </div>
                    <p className="text-slate-400 text-xs">Réponse texte libre</p>
                  </div>
                  <span className="text-slate-300 text-xl">→</span>
                </div>
              </button>
            </div>
          </>
        )}

      </main>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { QUESTIONS } from '../../lib/questions'
import { useRouter } from 'next/navigation'

export default function QuizPage() {
  const [etape, setEtape] = useState('chapitre') // 'chapitre' | 'niveau'
  const [chapitreChoisi, setChapitreChoisi] = useState(null)
  const router = useRouter()

  function choisirChapitre(key) {
    setChapitreChoisi(key)
    setEtape('niveau')
  }

  function choisirNiveau(niveau) {
    router.push(`/quiz/jouer?chapitre=${chapitreChoisi}&niveau=${niveau}`)
  }

  function retourAccueil() {
    router.push('/accueil')
  }

  function retourChapitre() {
    setEtape('chapitre')
    setChapitreChoisi(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
        <button
          type="button"
          onClick={etape === 'chapitre' ? retourAccueil : retourChapitre}
          className="bg-transparent border-none cursor-pointer text-[#1a6b8a] font-bold text-sm flex items-center gap-2"
        >
          ← Retour
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a6b8a] rounded-lg flex items-center justify-center text-lg">
            🧠
          </div>
          <span className="font-extrabold text-[#1a6b8a] text-base">NeuroKineo</span>
        </div>
        <div className="w-16" />
      </nav>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">

        {/* ÉTAPE 1 — Choix du chapitre */}
        {etape === 'chapitre' && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-slate-800">Choisir un chapitre</h1>
              <p className="text-slate-400 text-sm mt-1">Sélectionne la matière à réviser</p>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(QUESTIONS).map(([key, chapitre]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => choisirChapitre(key)}
                  className="bg-white border-2 border-slate-200 hover:border-[#1a6b8a] hover:bg-[#e8f4f8] rounded-2xl p-5 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{chapitre.emoji}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-base group-hover:text-[#1a6b8a]">
                        {chapitre.label}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">{chapitre.description}</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-[#1a6b8a] text-xl">→</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ÉTAPE 2 — Choix du niveau */}
        {etape === 'niveau' && chapitreChoisi && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{QUESTIONS[chapitreChoisi].emoji}</span>
                <h1 className="text-xl font-extrabold text-slate-800">
                  {QUESTIONS[chapitreChoisi].label}
                </h1>
              </div>
              <p className="text-slate-400 text-sm">Choisir un niveau de difficulté</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Niveau 1 */}
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
                      <span className="text-xs bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">
                        Facile
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">QCM — 4 choix de réponses</p>
                  </div>
                  <span className="text-slate-300 text-xl">→</span>
                </div>
              </button>

              {/* Niveau 2 */}
              <button
                type="button"
                onClick={() => choisirNiveau(2)}
                className="bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 rounded-2xl p-5 text-left transition-all cursor-pointer opacity-50 cursor-not-allowed"
                disabled
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      <p className="font-bold text-slate-800">Niveau 2</p>
                      <span className="text-xs bg-amber-100 text-amber-600 font-bold px-2 py-0.5 rounded-full">
                        Moyen
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full">
                        Bientôt
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">QCM avec images</p>
                  </div>
                  <span className="text-slate-300 text-xl">→</span>
                </div>
              </button>

              {/* Niveau 3 */}
              <button
                type="button"
                onClick={() => choisirNiveau(3)}
                className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-left transition-all cursor-not-allowed opacity-50"
                disabled
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                      <p className="font-bold text-slate-800">Niveau 3</p>
                      <span className="text-xs bg-red-100 text-red-500 font-bold px-2 py-0.5 rounded-full">
                        Difficile
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full">
                        Bientôt
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">Réponse texte libre uniquement</p>
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
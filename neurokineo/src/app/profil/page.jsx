'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const supabase = createClient()

export default function ProfilPage() {
  const [profil, setProfil] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [sauvegarde, setSauvegarde] = useState(false)
  const [succes, setSucces] = useState(false)
  const [erreur, setErreur] = useState('')

  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [annee, setAnnee] = useState('K1')
  const [ecole, setEcole] = useState('')
  const [dateNaissance, setDateNaissance] = useState('')

  const router = useRouter()

  const chargerProfil = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data } = await supabase
      .from('profils')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setProfil(data)
      setNom(data.nom || '')
      setPrenom(data.prenom || '')
      setAnnee(data.annee || 'K1')
      setEcole(data.ecole || '')
      setDateNaissance(data.date_naissance || '')
    }

    setChargement(false)
  }, [router])

  useEffect(() => {
    chargerProfil()
  }, [chargerProfil])

  async function sauvegarder() {
    if (!profil) return
    setSauvegarde(true)
    setErreur('')
    setSucces(false)

    const { error } = await supabase
      .from('profils')
      .update({ nom, prenom, annee, ecole, date_naissance: dateNaissance })
      .eq('id', profil.id)

    if (error) {
      setErreur('Erreur lors de la sauvegarde. Réessaie.')
    } else {
      setSucces(true)
      setTimeout(() => setSucces(false), 3000)
    }

    setSauvegarde(false)
  }

  if (chargement) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Chargement...</p>
      </div>
    )
  }

  const inputClass = "w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm outline-none focus:border-[#1a6b8a] transition-colors bg-white"

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
        <button
          type="button"
          onClick={() => router.push('/accueil')}
          className="bg-transparent border-none cursor-pointer text-[#1a6b8a] font-bold text-sm"
        >
          ← Retour
        </button>
        <span className="font-extrabold text-[#1a6b8a] text-base">Mon profil</span>
        <div className="w-16" />
      </nav>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-[#1a6b8a] rounded-full flex items-center justify-center text-3xl mb-3">
            👤
          </div>
          <p className="font-extrabold text-slate-800 text-lg">{prenom} {nom}</p>
          <p className="text-slate-400 text-sm">{profil?.email}</p>
          <span className="mt-2 text-xs bg-[#e8f4f8] text-[#1a6b8a] font-bold px-3 py-1 rounded-full">
            {annee}
          </span>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">
            Informations personnelles
          </h2>

          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label htmlFor="nom" className="text-xs font-bold text-slate-400 mb-1 block">Nom</label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="prenom" className="text-xs font-bold text-slate-400 mb-1 block">Prénom</label>
              <input
                id="prenom"
                type="text"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="date-naissance" className="text-xs font-bold text-slate-400 mb-1 block">Date de naissance</label>
            <input
              id="date-naissance"
              type="date"
              value={dateNaissance}
              onChange={e => setDateNaissance(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="annee" className="text-xs font-bold text-slate-400 mb-1 block">Année de formation</label>
            <select
              id="annee"
              value={annee}
              onChange={e => setAnnee(e.target.value)}
              className={inputClass}
            >
              <option value="K1">K1 — 1ère année</option>
              <option value="K2">K2 — 2ème année</option>
              <option value="K3">K3 — 3ème année</option>
              <option value="K4">K4 — 4ème année</option>
              <option value="K5">K5 — 5ème année</option>
              <option value="DE">DE — Diplômé d'État</option>
            </select>
          </div>

          <div className="mb-1">
            <label htmlFor="ecole" className="text-xs font-bold text-slate-400 mb-1 block">École</label>
            <input
              id="ecole"
              type="text"
              value={ecole}
              onChange={e => setEcole(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Email (non modifiable) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">
            Compte
          </h2>
          <label htmlFor="email" className="text-xs font-bold text-slate-400 mb-1 block">Email</label>
          <input
            id="email"
            type="email"
            value={profil?.email || ''}
            disabled
            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-slate-400 text-sm bg-slate-50 cursor-not-allowed"
          />
          <p className="text-xs text-slate-300 mt-1">L'email ne peut pas être modifié.</p>
        </div>

        {/* Messages */}
        {erreur && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-red-500 text-sm font-semibold">{erreur}</p>
          </div>
        )}

        {succes && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
            <p className="text-green-600 text-sm font-semibold">✓ Profil mis à jour avec succès !</p>
          </div>
        )}

        {/* Bouton sauvegarder */}
        <button
          type="button"
          onClick={sauvegarder}
          disabled={sauvegarde}
          className="w-full bg-[#1a6b8a] hover:bg-[#104d66] text-white font-bold rounded-2xl py-4 text-sm transition-colors cursor-pointer border-none disabled:opacity-60 mb-3"
        >
          {sauvegarde ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
        </button>

      </main>
    </div>
  )
}
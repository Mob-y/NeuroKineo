'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [sujet, setSujet] = useState('')
  const [message, setMessage] = useState('')
  const [envoye, setEnvoye] = useState(false)
  const [chargement, setChargement] = useState(false)

  const router = useRouter()

  async function handleSubmit() {
    if (!nom || !email || !message) return
    setChargement(true)

    // Pour l'instant on simule l'envoi
    // Plus tard on branchera un vrai service mail (ex: Resend)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setEnvoye(true)
    setChargement(false)
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
        <span className="font-extrabold text-[#1a6b8a] text-base">Nous contacter</span>
        <div className="w-16" />
      </nav>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">

        {!envoye ? (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-slate-800">Une question ?</h1>
              <p className="text-slate-400 text-sm mt-1">
                Envoie-nous un message, on te répond rapidement.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">

              <div className="mb-3">
                <label htmlFor="nom" className="text-xs font-bold text-slate-400 mb-1 block">Nom</label>
                <input
                  id="nom"
                  type="text"
                  placeholder="Ton nom"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="text-xs font-bold text-slate-400 mb-1 block">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sujet" className="text-xs font-bold text-slate-400 mb-1 block">Sujet</label>
                <select
                  id="sujet"
                  value={sujet}
                  onChange={e => setSujet(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Choisir un sujet</option>
                  <option value="bug">Signaler un bug</option>
                  <option value="question">Question sur une question</option>
                  <option value="suggestion">Suggestion d'amélioration</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="mb-1">
                <label htmlFor="message" className="text-xs font-bold text-slate-400 mb-1 block">Message</label>
                <textarea
                  id="message"
                  placeholder="Ton message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={chargement || !nom || !email || !message}
              className="w-full bg-[#1a6b8a] hover:bg-[#104d66] text-white font-bold rounded-2xl py-4 text-sm transition-colors cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {chargement ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 py-16 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-4">
              ✅
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Message envoyé !</h2>
            <p className="text-slate-400 text-sm mb-6">
              Merci pour ton message. On te répondra dans les plus brefs délais.
            </p>
            <button
              type="button"
              onClick={() => router.push('/accueil')}
              className="bg-[#1a6b8a] text-white font-bold rounded-2xl px-8 py-3 text-sm border-none cursor-pointer hover:bg-[#104d66] transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        )}

      </main>
    </div>
  )
}
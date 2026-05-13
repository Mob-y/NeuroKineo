'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Footer from "../../components/Footer";

const supabase = createClient()

export default function ResultatsPage() {
  const [historique, setHistorique] = useState([])
  const [chargement, setChargement] = useState(true)
  const [filtre, setFiltre] = useState('tous')
  const router = useRouter()

  const chargerHistorique = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data } = await supabase
      .from('historique_quiz')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    setHistorique(data || [])
    setChargement(false)
  }, [router])

  useEffect(() => {
    chargerHistorique()
  }, [chargerHistorique])

  // Stats globales
  const totalQuiz = historique.length
  const totalQuestions = historique.reduce((acc, r) => acc + r.total, 0)
  const totalBonnes = historique.reduce((acc, r) => acc + r.score, 0)
  const moyenneGlobale = totalQuestions > 0 ? Math.round((totalBonnes / totalQuestions) * 100) : 0

  // Matieres disponibles pour le filtre
  const matieres = ['tous', ...new Set(historique.map(r => r.matiere))]

  // Historique filtré
  const historiqueFiltré = filtre === 'tous'
    ? historique
    : historique.filter(r => r.matiere === filtre)

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  function couleurScore(score, total) {
    const pct = score / total
    if (pct >= 0.75) return 'text-green-500'
    if (pct >= 0.5) return 'text-amber-500'
    return 'text-red-500'
  }

  function bgScore(score, total) {
    const pct = score / total
    if (pct >= 0.75) return 'bg-green-50 border-green-200'
    if (pct >= 0.5) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  if (chargement) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Chargement...</p>
      </div>
    )
  }

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
        <span className="font-extrabold text-[#1a6b8a] text-base">Vos résultats</span>
        <div className="w-16" />
      </nav>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">

        {/* Stats globales */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
            <p className="text-2xl font-extrabold text-[#1a6b8a]">{totalQuiz}</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold">Quiz effectués</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
            <p className="text-2xl font-extrabold text-[#1a6b8a]">{totalQuestions}</p>
            <p className="text-xs text-slate-400 mt-1 font-semibold">Questions</p>
          </div>
          <div className={`rounded-2xl border shadow-sm p-4 text-center ${moyenneGlobale >= 75 ? 'bg-green-50 border-green-200' : moyenneGlobale >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-2xl font-extrabold ${moyenneGlobale >= 75 ? 'text-green-500' : moyenneGlobale >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
              {moyenneGlobale}%
            </p>
            <p className="text-xs text-slate-400 mt-1 font-semibold">Moyenne</p>
          </div>
        </div>

        {totalQuiz === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            <p className="text-3xl mb-3">📊</p>
            <p className="font-bold text-slate-700 mb-1">Aucun quiz effectué</p>
            <p className="text-slate-400 text-sm mb-4">Lance ton premier quiz pour voir tes résultats ici !</p>
            <button
              type="button"
              onClick={() => router.push('/quiz')}
              className="bg-[#1a6b8a] text-white font-bold rounded-xl px-6 py-3 text-sm border-none cursor-pointer hover:bg-[#104d66] transition-colors"
            >
              Commencer un quiz
            </button>
          </div>
        ) : (
          <>
            {/* Filtres par matière */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {matieres.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFiltre(m)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border-none cursor-pointer transition-colors ${
                    filtre === m
                      ? 'bg-[#1a6b8a] text-white'
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  {m === 'tous' ? 'Tous' : m}
                </button>
              ))}
            </div>

            {/* Liste des résultats */}
            <div className="flex flex-col gap-3">
              {historiqueFiltré.map(r => (
                <div
                  key={r.id}
                  className={`bg-white rounded-2xl border shadow-sm p-4 ${bgScore(r.score, r.total)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm">{r.matiere}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{r.sous_section} · {r.niveau}</p>
                      <p className="text-xs text-slate-300 mt-1">{formatDate(r.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-extrabold ${couleurScore(r.score, r.total)}`}>
                        {r.score}/{r.total}
                      </p>
                      <p className={`text-xs font-bold ${couleurScore(r.score, r.total)}`}>
                        {Math.round((r.score / r.total) * 100)}%
                      </p>
                    </div>
                  </div>

                  {/* Mini barre de progression */}
                  <div className="bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        (r.score / r.total) >= 0.75 ? 'bg-green-400' :
                        (r.score / r.total) >= 0.5 ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.round((r.score / r.total) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
      <Footer />
    </div>
  )
}
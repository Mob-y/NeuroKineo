'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { QUESTIONS } from '../../../lib/questions'
import { createClient } from '../../../lib/supabase'
import { Suspense } from 'react'

function QuizJouer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chapitre = searchParams.get('chapitre')
  const niveau = parseInt(searchParams.get('niveau'))

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [reponseChoisie, setReponseChoisie] = useState(null)
  const [reponses, setReponses] = useState([])
  const [score, setScore] = useState(0)
  const [valide, setValide] = useState(false)

  const supabase = createClient()

  const initialiserQuiz = useCallback(() => {
    if (!chapitre || !QUESTIONS[chapitre]) { router.push('/quiz'); return }
    const qs = QUESTIONS[chapitre].niveaux[niveau]
    if (!qs || qs.length === 0) { router.push('/quiz'); return }
    const melange = [...qs].sort(() => Math.random() - 0.5)
    setQuestions(melange)
  }, [chapitre, niveau, router])

  useEffect(() => {
    initialiserQuiz()
  }, [initialiserQuiz])

  function choisirReponse(index_rep) {
    if (valide) return
    setReponseChoisie(index_rep)
  }

  function validerReponse() {
    if (reponseChoisie === null) return
    const q = questions[index]
    const correct = reponseChoisie === q.bonne_reponse
    if (correct) setScore(s => s + 1)
    setReponses(prev => [...prev, {
      question: q.question,
      reponseChoisie,
      bonne_reponse: q.bonne_reponse,
      reponses: q.reponses,
      explication: q.explication,
      correct
    }])
    setValide(true)
  }

  async function questionSuivante() {
    if (index < questions.length - 1) {
      setIndex(i => i + 1)
      setReponseChoisie(null)
      setValide(false)
    } else {
      // Sauvegarder en base
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('historique_quiz').insert({
          user_id: user.id,
          matiere: QUESTIONS[chapitre].label,
          sous_section: chapitre,
          niveau: `Niveau ${niveau}`,
          score,
          total: questions.length,
        })
      }

      // Passer aux résultats via sessionStorage
      sessionStorage.setItem('quiz_resultats', JSON.stringify({
        chapitre,
        niveau,
        score: score + (reponses[reponses.length - 1]?.correct ? 0 : 0),
        total: questions.length,
        reponses: [...reponses]
      }))

      router.push('/resultats-quiz')
    }
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Chargement...</p>
      </div>
    )
  }

  const q = questions[index]
  const progression = ((index) / questions.length) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
        <button
          type="button"
          onClick={() => router.push('/quiz')}
          className="bg-transparent border-none cursor-pointer text-[#1a6b8a] font-bold text-sm"
        >
          ✕ Quitter
        </button>
        <span className="text-sm font-bold text-slate-500">
          {index + 1} / {questions.length}
        </span>
        <span className="text-sm font-bold text-[#1a6b8a]">
          {score} ✓
        </span>
      </nav>

      {/* BARRE DE PROGRESSION */}
      <div className="bg-slate-200 h-1.5">
        <div
          className="h-full bg-[#1a6b8a] transition-all duration-500"
          style={{ width: `${progression}%` }}
        />
      </div>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">

        {/* Question */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
            {QUESTIONS[chapitre]?.emoji} {QUESTIONS[chapitre]?.label}
          </p>
          <p className="text-base font-bold text-slate-800 leading-relaxed">
            {q.question}
          </p>
        </div>

        {/* Réponses */}
        <div className="flex flex-col gap-3 mb-4">
          {q.reponses.map((rep, i) => {
            let style = "bg-white border-2 border-slate-200 text-slate-700"

            if (valide) {
              if (i === q.bonne_reponse) {
                style = "bg-green-50 border-2 border-green-400 text-green-700"
              } else if (i === reponseChoisie && i !== q.bonne_reponse) {
                style = "bg-red-50 border-2 border-red-400 text-red-600"
              } else {
                style = "bg-white border-2 border-slate-100 text-slate-400"
              }
            } else if (reponseChoisie === i) {
              style = "bg-[#e8f4f8] border-2 border-[#1a6b8a] text-[#1a6b8a]"
            } else {
              style = "bg-white border-2 border-slate-200 text-slate-700 hover:border-[#1a6b8a] hover:bg-[#e8f4f8]"
            }

            return (
              <button
                key={`${q.id}-rep-${rep.slice(0, 20)}`}
                type="button"
                onClick={() => choisirReponse(i)}
                disabled={valide}
                className={`${style} rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-all cursor-pointer disabled:cursor-default`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {['A', 'B', 'C', 'D'][i]}
                  </span>
                  {rep}
                </span>
              </button>
            )
          })}
        </div>

        {/* Explication après validation */}
        {valide && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-blue-500 mb-1">💡 Explication</p>
            <p className="text-sm text-blue-800 leading-relaxed">{q.explication}</p>
          </div>
        )}

        {/* Boutons */}
        {!valide ? (
          <button
            type="button"
            onClick={validerReponse}
            disabled={reponseChoisie === null}
            className="w-full bg-[#1a6b8a] hover:bg-[#104d66] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-2xl py-4 text-sm transition-colors cursor-pointer disabled:cursor-not-allowed border-none"
          >
            Valider ma réponse
          </button>
        ) : (
          <button
            type="button"
            onClick={questionSuivante}
            className="w-full bg-[#1a6b8a] hover:bg-[#104d66] text-white font-bold rounded-2xl py-4 text-sm transition-colors cursor-pointer border-none"
          >
            {index < questions.length - 1 ? 'Question suivante →' : 'Voir mes résultats →'}
          </button>
        )}

      </main>
    </div>
  )
}

export default function QuizJouerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Chargement...</p>
      </div>
    }>
      <QuizJouer />
    </Suspense>
  )
}
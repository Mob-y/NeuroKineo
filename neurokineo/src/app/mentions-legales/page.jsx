'use client'

import { useRouter } from 'next/navigation'
import  Footer  from "../../components/Footer";

export default function MentionsLegalesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-transparent border-none cursor-pointer text-[#1a6b8a] font-bold text-sm"
        >
          ← Retour
        </button>
        <span className="font-extrabold text-[#1a6b8a] text-base">Mentions légales</span>
        <div className="w-16" />
      </nav>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6 pb-12">

        {/* Éditeur */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-[#1a6b8a] uppercase tracking-wide mb-3">
            Éditeur du site
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Le site <strong>NeuroKineo</strong> est édité par un auto-entrepreneur.
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500">Site :</span> NeuroKineo</p>
            <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500">Email :</span> serinteddy@gmail.com</p>
          </div>
        </div>

        {/* Hébergement */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-[#1a6b8a] uppercase tracking-wide mb-3">
            Hébergement
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Ce site est hébergé par :
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500">Société :</span> Vercel Inc.</p>
            <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500">Site :</span> vercel.com</p>
          </div>
        </div>

        {/* Données personnelles */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-[#1a6b8a] uppercase tracking-wide mb-3">
            Données personnelles (RGPD)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul className="flex flex-col gap-2 mb-3">
            {[
              "Droit d'accès à vos données",
              "Droit de rectification",
              "Droit à l'effacement (droit à l'oubli)",
              "Droit à la portabilité de vos données",
              "Droit d'opposition au traitement"
            ].map(droit => (
              <li key={droit} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-[#1a6b8a] font-bold flex-shrink-0">•</span>
                {droit}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed">
            Pour exercer ces droits, contactez-nous à : <span className="font-semibold text-[#1a6b8a]">serinteddy@gmail.com</span>
          </p>
        </div>

        {/* Données collectées */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-[#1a6b8a] uppercase tracking-wide mb-3">
            Données collectées
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            Dans le cadre de l'utilisation de NeuroKineo, nous collectons les données suivantes :
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "Nom et prénom",
              "Adresse email",
              "Date de naissance",
              "Année de formation et école",
              "Résultats des quiz effectués"
            ].map(donnee => (
              <li key={donnee} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-[#1a6b8a] font-bold flex-shrink-0">•</span>
                {donnee}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 mt-3">
            Ces données sont utilisées uniquement dans le cadre du fonctionnement de l'application et ne sont jamais vendues à des tiers.
          </p>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-[#1a6b8a] uppercase tracking-wide mb-3">
            Cookies
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            NeuroKineo utilise des cookies strictement nécessaires au fonctionnement de l'application (authentification, session utilisateur). Aucun cookie publicitaire ou de tracking n'est utilisé.
          </p>
        </div>

        {/* Propriété intellectuelle */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
          <h2 className="text-sm font-bold text-[#1a6b8a] uppercase tracking-wide mb-3">
            Propriété intellectuelle
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            L'ensemble du contenu de NeuroKineo (questions, textes, design) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </div>

        {/* Avertissement médical */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-4">
          <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wide mb-3">
            ⚠️ Avertissement
          </h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            Le contenu de NeuroKineo est fourni à titre pédagogique uniquement. Il ne remplace en aucun cas les cours officiels des instituts de formation en masso-kinésithérapie, ni l'avis d'un professionnel de santé.
          </p>
        </div>

        {/* Dernière mise à jour */}
        <p className="text-center text-xs text-slate-300 mt-4">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

      </main>
      <Footer />
    </div>
  )
}
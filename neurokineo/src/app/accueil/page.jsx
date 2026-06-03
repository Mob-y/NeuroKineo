"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function AccueilPage() {
	const [profil, setProfil] = useState(null);
	const [dernierResultats, setDernierResultats] = useState([]);
	const [chargement, setChargement] = useState(true);

	const router = useRouter();
	const supabase = createClient();

	const chargerDonnees = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			router.push("/login");
			return;
		}

		const { data: profilData } = await supabase
			.from("profils")
			.select("*")
			.eq("id", user.id)
			.single();

		setProfil(profilData);

		const { data: resultats } = await supabase
			.from("historique_quiz")
			.select("*")
			.eq("user_id", user.id)
			.order("date", { ascending: false })
			.limit(3);

		setDernierResultats(resultats || []);
		setChargement(false);
	}, [router, supabase]);

	useEffect(() => {
		chargerDonnees();
	}, [chargerDonnees]);

	if (chargement) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<p className="text-slate-400 text-sm">Chargement...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			<Navbar />

			{/* CONTENU PRINCIPAL */}
			<main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">
				<div className="mb-6">
					<h1 className="text-xl font-extrabold text-slate-800">
						Bonjour, {profil?.prenom} 👋
					</h1>
					<p className="text-slate-400 text-sm mt-1">
						Prêt à réviser aujourd'hui ?
					</p>
				</div>

				{/* Derniers résultats */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
					<h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">
						Vos derniers résultats
					</h2>

					{dernierResultats.length === 0 ? (
						<p className="text-slate-400 text-sm">
							Aucun quiz effectué pour l'instant.
						</p>
					) : (
						<div className="flex flex-col gap-3">
							{dernierResultats.map((r) => (
								<div key={r.id} className="flex items-center justify-between">
									<div>
										<p className="text-sm font-bold text-slate-700">
											{r.matiere}
										</p>
										<p className="text-xs text-slate-400">
											{r.sous_section} · Niveau {r.niveau}
										</p>
									</div>
									<span
										className={`text-sm font-extrabold ${
											(r.score / r.total) >= 0.75
												? "text-green-500"
												: r.score / r.total >= 0.5
													? "text-amber-500"
													: "text-red-500"
										}`}
									>
										{r.score}/{r.total}
									</span>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Bouton quiz */}
				<button
					type="button"
					onClick={() => router.push("/quiz")}
					className="w-full bg-[#1a6b8a] hover:bg-[#104d66] text-white font-bold rounded-2xl py-4 text-base transition-colors cursor-pointer border-none shadow-md"
				>
					Accéder au quiz →
				</button>
			</main>
			<Footer />
		</div>
	);
}
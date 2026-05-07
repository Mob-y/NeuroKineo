"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function AccueilPage() {
	const [menuOuvert, setMenuOuvert] = useState(false);
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

	async function seDeconnecter() {
		await supabase.auth.signOut();
		router.push("/login");
	}

	function fermerMenu() {
		setMenuOuvert(false);
	}

	function handleMenuKeyDown(e) {
		if (e.key === "Escape") setMenuOuvert(false);
	}

	if (chargement) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<p className="text-slate-400 text-sm">Chargement...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			{/* NAVBAR */}
			<nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-[#1a6b8a] rounded-lg flex items-center justify-center text-lg">
						🧠
					</div>
					<span className="font-extrabold text-[#1a6b8a] text-base">
						NeuroKineo
					</span>
				</div>

				<button
					type="button"
					onClick={() => setMenuOuvert(!menuOuvert)}
					className="flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
					aria-label="Menu"
				>
					<span
						className={`block w-6 h-0.5 bg-slate-600 transition-all duration-300 ${menuOuvert ? "rotate-45 translate-y-2" : ""}`}
					/>
					<span
						className={`block w-6 h-0.5 bg-slate-600 transition-all duration-300 ${menuOuvert ? "opacity-0" : ""}`}
					/>
					<span
						className={`block w-6 h-0.5 bg-slate-600 transition-all duration-300 ${menuOuvert ? "-rotate-45 -translate-y-2" : ""}`}
					/>
				</button>
			</nav>

			{/* MENU BURGER OVERLAY */}
			{menuOuvert && (
				<button
					type="button"
					className="fixed inset-0 z-20 bg-transparent border-none cursor-default w-full"
					onClick={fermerMenu}
					onKeyDown={handleMenuKeyDown}
					aria-label="Fermer le menu"
				>
					<nav className="absolute top-14 right-0 w-64 bg-white shadow-xl border-l border-slate-200 h-full">
						{/* Infos utilisateur */}
						<div className="p-5 border-b border-slate-100">
							<p className="font-bold text-slate-800 text-base">
								{profil?.prenom} {profil?.nom}
							</p>
							<p className="text-slate-400 text-xs mt-0.5">
								{profil?.annee} — {profil?.ecole}
							</p>
						</div>

						{/* Liens */}
						<div className="p-3 flex flex-col gap-1">
							<button
								type="button"
								onClick={() => router.push("/profil")}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>👤</span> Mon profil
							</button>
							<button
								type="button"
								onClick={() => router.push("/resultats")}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>📊</span> Vos résultats
							</button>
							<button
								type="button"
								onClick={() => router.push("/contact")}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>✉️</span> Nous contacter
							</button>
						</div>

						{/* Déconnexion */}
						<div className="absolute bottom-8 left-0 right-0 px-3">
							<button
								type="button"
								onClick={seDeconnecter}
								className="w-full px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-colors bg-transparent border-none cursor-pointer text-left flex items-center gap-3"
							>
								<span>🚪</span> Se déconnecter
							</button>
						</div>
					</nav>
				</button>
			)}

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
		</div>
	);
}

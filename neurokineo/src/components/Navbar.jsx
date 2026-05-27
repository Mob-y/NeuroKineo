"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function Navbar() {
	const [menuOuvert, setMenuOuvert] = useState(false);
	const [profil, setProfil] = useState(null);
	const router = useRouter();

	const chargerProfil = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return;

		const { data } = await supabase
			.from("profils")
			.select("nom, prenom, annee, ecole")
			.eq("id", user.id)
			.single();

		setProfil(data);
	}, []);

	useEffect(() => {
		chargerProfil();
	}, [chargerProfil]);

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

	return (
		<>
			<nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-0 z-10">
				<button
					type="button"
					onClick={() => router.push("/accueil")}
					className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
				>
					<div className="w-8 h-8 bg-[#1a6b8a] rounded-lg flex items-center justify-center text-lg">
						🧠
					</div>
					<span className="font-extrabold text-[#1a6b8a] text-base">
						NeuroKineo
					</span>
				</button>

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

			{menuOuvert && (
				<>
					<button
						type="button"
						className="fixed inset-0 z-20 bg-transparent border-none cursor-default p-0 m-0"
						onClick={fermerMenu}
						onKeyDown={handleMenuKeyDown}
						aria-label="Fermer le menu"
						tabIndex={-1}
					/>
					<nav className="fixed top-14 right-0 w-64 bg-white shadow-xl border-l border-slate-200 h-full z-30">
						{/* Infos utilisateur */}
						{profil && (
							<div className="p-5 border-b border-slate-100">
								<p className="font-bold text-slate-800 text-base">
									{profil.prenom} {profil.nom}
								</p>
								<p className="text-slate-400 text-xs mt-0.5">
									{profil.annee} — {profil.ecole}
								</p>
							</div>
						)}

						{/* Liens */}
						<div className="p-3 flex flex-col gap-1">
							<button
								type="button"
								onClick={() => {
									router.push("/accueil");
									fermerMenu();
								}}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>🏠</span> Accueil
							</button>
							<button
								type="button"
								onClick={() => {
									router.push("/quiz");
									fermerMenu();
								}}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>🎯</span> Quiz
							</button>
							<button
								type="button"
								onClick={() => {
									router.push("/profil");
									fermerMenu();
								}}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>👤</span> Mon profil
							</button>
							<button
								type="button"
								onClick={() => {
									router.push("/resultats");
									fermerMenu();
								}}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>📊</span> Vos résultats
							</button>
							<button
								type="button"
								onClick={() => {
									router.push("/contact");
									fermerMenu();
								}}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>✉️</span> Nous contacter
							</button>
							<button
								type="button"
								onClick={() => {
									router.push("/mentions-legales");
									fermerMenu();
								}}
								className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-3"
							>
								<span>📋</span> Mentions légales
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
				</>
			)}
		</>
	);
}

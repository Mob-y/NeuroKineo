"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import  Footer  from "../../components/Footer";

export default function LoginPage() {
	const [isInscription, setIsInscription] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [dateNaissance, setDateNaissance] = useState("");
	const [annee, setAnnee] = useState("K1");
	const [ecole, setEcole] = useState("");
	const [erreur, setErreur] = useState("");
	const [chargement, setChargement] = useState(false);

	const router = useRouter();
	const supabase = createClient();

	async function handleSubmit() {
		setErreur("");
		setChargement(true);

		if (isInscription) {
			const { data, error } = await supabase.auth.signUp({ email, password });
			if (error) {
				setErreur(error.message);
				setChargement(false);
				return;
			}

			await supabase.from("profils").insert({
				id: data.user.id,
				email,
				nom,
				prenom,
				date_naissance: dateNaissance,
				annee,
				ecole,
			});

			router.push("/accueil");
		} else {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				setErreur("Email ou mot de passe incorrect");
				setChargement(false);
				return;
			}
			router.push("/accueil");
		}

		setChargement(false);
	}

	function handleKeyDown(e) {
		if (e.key === "Enter") handleSubmit();
	}

	function toggleMode() {
		setIsInscription(!isInscription);
		setErreur("");
	}

	const inputClass =
		"w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm mb-3 outline-none focus:border-[#1a6b8a] transition-colors bg-white";

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
				{/* Logo */}
				<div className="flex flex-col items-center mb-8">
					<div className="w-12 h-12 bg-[#1a6b8a] rounded-xl flex items-center justify-center text-2xl mb-3">
						🧠
					</div>
					<h1 className="text-2xl font-extrabold text-[#1a6b8a]">NeuroKineo</h1>
					<p className="text-slate-500 text-sm mt-1">
						{isInscription ? "Créer un compte" : "Connexion"}
					</p>
				</div>

				{/* Champs inscription uniquement */}
				{isInscription && (
					<>
						<div className="flex gap-3">
							<input
								type="text"
								placeholder="Nom"
								value={nom}
								onChange={(e) => setNom(e.target.value)}
								className={inputClass}
							/>
							<input
								type="text"
								placeholder="Prénom"
								value={prenom}
								onChange={(e) => setPrenom(e.target.value)}
								className={inputClass}
							/>
						</div>

						<input
							type="date"
							value={dateNaissance}
							onChange={(e) => setDateNaissance(e.target.value)}
							className={inputClass}
						/>

						<select
							value={annee}
							onChange={(e) => setAnnee(e.target.value)}
							className={inputClass}
						>
							<option value="K1">K1 — 1ère année</option>
							<option value="K2">K2 — 2ème année</option>
							<option value="K3">K3 — 3ème année</option>
							<option value="K4">K4 — 4ème année</option>
							<option value="K5">K5 — 5ème année</option>
							<option value="DE">DE — Diplômé d'État</option>
						</select>

						<input
							type="text"
							placeholder="Nom de l'école"
							value={ecole}
							onChange={(e) => setEcole(e.target.value)}
							className={inputClass}
						/>
					</>
				)}

				{/* Email & Mot de passe */}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onKeyDown={handleKeyDown} // ← ajoute ça
					className={inputClass}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={handleKeyDown} // ← ajoute ça
					className={inputClass}
				/>

				{/* Erreur */}
				{erreur && <p className="text-red-500 text-sm mb-3">{erreur}</p>}

				{/* Bouton submit */}
				<button
					type="button"
					onClick={handleSubmit}
					disabled={chargement}
					className="w-full bg-[#1a6b8a] hover:bg-[#104d66] text-white font-bold rounded-lg py-3 text-sm transition-colors disabled:opacity-60 cursor-pointer mt-1"
				>
					{chargement
						? "Chargement..."
						: isInscription
							? "S'inscrire"
							: "Se connecter"}
				</button>

				{/* Switch login/inscription */}
				<p className="text-center text-sm text-slate-500 mt-4">
					{isInscription ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
					<button
						type="button"
						onClick={toggleMode}
						className="text-[#1a6b8a] font-bold cursor-pointer hover:underline bg-transparent border-none p-0 text-sm"
					>
						{isInscription ? "Se connecter" : "S'inscrire"}
					</button>
				</p>
			</div>
			<Footer />
		</div>
	);
}

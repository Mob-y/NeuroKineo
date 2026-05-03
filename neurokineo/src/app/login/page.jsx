"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [isInscription, setIsInscription] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [prenom, setPrenom] = useState("");
	const [annee, setAnnee] = useState("K1");
	const [erreur, setErreur] = useState("");
	const [chargement, setChargement] = useState(false);

	const router = useRouter();
	const supabase = createClient();

	async function handleSubmit() {
		setErreur("");
		setChargement(true);

		if (isInscription) {
			// Inscription
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				setErreur(error.message);
				setChargement(false);
				return;
			}

			// Créer le profil
			await supabase.from("profils").insert({
				id: data.user.id,
				email,
				prenom,
				annee,
			});

			router.push("/quiz");
		} else {
			// Connexion
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				setErreur("Email ou mot de passe incorrect");
				setChargement(false);
				return;
			}
			router.push("/quiz");
		}

		setChargement(false);
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#f5f7fa",
				padding: "1rem",
			}}
		>
			<div
				style={{
					background: "white",
					borderRadius: "16px",
					padding: "2rem",
					width: "100%",
					maxWidth: "420px",
					boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
				}}
			>
				{/* Logo */}
				<div style={{ textAlign: "center", marginBottom: "2rem" }}>
					<div
						style={{
							width: "48px",
							height: "48px",
							background: "#1a6b8a",
							borderRadius: "12px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "24px",
							margin: "0 auto 0.75rem",
						}}
					>
						🧠
					</div>
					<h1
						style={{ fontSize: "1.4rem", fontWeight: "800", color: "#1a6b8a" }}
					>
						NeuroKineo
					</h1>
					<p style={{ color: "#6b7c93", fontSize: "0.9rem", marginTop: "4px" }}>
						{isInscription ? "Créer un compte" : "Connexion"}
					</p>
				</div>

				{/* Champs */}
				{isInscription && (
					<>
						<input
							type="text"
							placeholder="Prénom"
							value={prenom}
							onChange={(e) => setPrenom(e.target.value)}
							style={inputStyle}
						/>
						<select
							value={annee}
							onChange={(e) => setAnnee(e.target.value)}
							style={inputStyle}
						>
							<option value="K1">K1 — 1ère année</option>
							<option value="K2">K2 — 2ème année</option>
							<option value="K3">K3 — 3ème année</option>
							<option value="K4">K4 — 4ème année</option>
						</select>
					</>
				)}

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={inputStyle}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={inputStyle}
				/>

				{erreur && (
					<p
						style={{
							color: "#c0392b",
							fontSize: "0.85rem",
							marginBottom: "1rem",
						}}
					>
						{erreur}
					</p>
				)}

				<button
					type="button"
					onClick={handleSubmit}
					disabled={chargement}
					style={{
						width: "100%",
						background: "#1a6b8a",
						color: "white",
						border: "none",
						borderRadius: "8px",
						padding: "0.9rem",
						fontSize: "1rem",
						fontWeight: "700",
						cursor: "pointer",
						opacity: chargement ? 0.7 : 1,
					}}
				>
					{chargement
						? "Chargement..."
						: isInscription
							? "S'inscrire"
							: "Se connecter"}
				</button>

				<p
					style={{
						textAlign: "center",
						marginTop: "1.2rem",
						fontSize: "0.9rem",
						color: "#6b7c93",
					}}
				>
					{isInscription ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
					<button
						type="button"
						onClick={() => setIsInscription(!isInscription)}
						style={{ color: "#1a6b8a", fontWeight: "700", cursor: "pointer", background: "none", border: "none", padding: 0 }}
					>
						{isInscription ? "Se connecter" : "S'inscrire"}
					</button>
				</p>
			</div>
		</div>
	);
}

const inputStyle = {
	width: "100%",
	border: "2px solid #dde4ed",
	borderRadius: "8px",
	padding: "0.8rem 1rem",
	fontSize: "0.95rem",
	marginBottom: "0.75rem",
	outline: "none",
	fontFamily: "inherit",
	background: "#f5f7fa",
};

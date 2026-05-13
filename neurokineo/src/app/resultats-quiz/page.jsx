"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";

export default function ResultatsQuizPage() {
	const [resultats, setResultats] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const data = sessionStorage.getItem("quiz_resultats");
		if (!data) {
			router.push("/quiz");
			return;
		}
		setResultats(JSON.parse(data));
	}, [router]);

	if (!resultats) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<p className="text-slate-400 text-sm">Chargement...</p>
			</div>
		);
	}

	const { score, total, reponses } = resultats;
	const pct = Math.round((score / total) * 100);

	const message =
		pct === 100
			? "🏆 Parfait !"
			: pct >= 75
				? "👏 Très bien !"
				: pct >= 50
					? "📚 Pas mal !"
					: "💪 Continue à réviser !";

	const couleurBarre =
		pct >= 75 ? "bg-green-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400";

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			{/* NAVBAR */}
			<nav className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-center sticky top-0 z-10">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-[#1a6b8a] rounded-lg flex items-center justify-center text-lg">
						🧠
					</div>
					<span className="font-extrabold text-[#1a6b8a] text-base">
						Résultats
					</span>
				</div>
			</nav>

			<main className="flex-1 p-4 max-w-lg mx-auto w-full pt-6">
				{/* Score bloc */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center mb-4">
					<p className="text-5xl font-extrabold text-[#1a6b8a] mb-1">
						{score}/{total}
					</p>
					<p className="text-slate-400 text-sm mb-1">
						{pct}% de bonnes réponses
					</p>
					<p className="text-slate-700 font-bold text-base">{message}</p>

					{/* Barre */}
					<div className="bg-slate-100 rounded-full h-3 mt-4 overflow-hidden">
						<div
							className={`${couleurBarre} h-full rounded-full transition-all duration-700`}
							style={{ width: `${pct}%` }}
						/>
					</div>
				</div>

				{/* Détail des réponses */}
				<h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">
					Détail des réponses
				</h2>

				<div className="flex flex-col gap-3 mb-6">
					{reponses.map((r, i) => (
						<div
							key={`reponse-${i}-${r.question.slice(0, 15)}`}
							className={`bg-white rounded-xl border-l-4 ${r.correct ? "border-green-400" : "border-red-400"} border border-slate-200 p-4`}
						>
							<div className="flex items-start gap-3">
								<span
									className={`text-sm font-bold flex-shrink-0 ${r.correct ? "text-green-500" : "text-red-500"}`}
								>
									{r.correct ? "✓" : "✗"}
								</span>
								<div className="flex-1">
									<p className="text-sm font-semibold text-slate-700 leading-relaxed mb-2">
										{r.question}
									</p>
									{!r.correct && (
										<p className="text-xs text-slate-400">
											Ta réponse :{" "}
											<span className="text-red-500 font-bold">
												{r.reponses[r.reponseChoisie]}
											</span>
											<br />
											Bonne réponse :{" "}
											<span className="text-green-600 font-bold">
												{r.reponses[r.bonne_reponse]}
											</span>
										</p>
									)}
									<p className="text-xs text-blue-600 mt-2 leading-relaxed">
										💡 {r.explication}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Boutons */}
				<div className="flex flex-col gap-3 pb-6">
					<button
						type="button"
						onClick={() => router.push("/quiz")}
						className="w-full bg-[#1a6b8a] hover:bg-[#104d66] text-white font-bold rounded-2xl py-4 text-sm transition-colors cursor-pointer border-none"
					>
						Refaire un quiz
					</button>
					<button
						type="button"
						onClick={() => router.push("/accueil")}
						className="w-full bg-white hover:bg-slate-50 text-[#1a6b8a] font-bold rounded-2xl py-4 text-sm transition-colors cursor-pointer border-2 border-[#1a6b8a]"
					>
						Retour à l'accueil
					</button>
				</div>
			</main>
			<Footer />
		</div>
	);
}

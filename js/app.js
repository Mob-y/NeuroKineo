// NeuroKineo - App Logic
// State global de l'application
const STATE = {
	matiere: null,
	annee: null,
	sousSection: null,
	niveau: null,
	questions: [],
	questionIndex: 0,
	score: 0,
	reponses: [],
};

// ==================== NAVIGATION ====================
function showPage(id) {
	document.querySelectorAll(".page").forEach((p) => {
		p.classList.remove("active");
	});
	document.getElementById(id).classList.add("active");
	window.scrollTo(0, 0);
}

// ==================== PAGE ACCUEIL ====================
function buildAccueil() {
	const container = document.getElementById("matieres-list");
	container.innerHTML = "";
	Object.entries(window.QUESTIONS).forEach(([key, matiere]) => {
		const card = document.createElement("div");
		card.className = "card-matiere";
		card.innerHTML = `<span>${matiere.label}</span><span class="arrow">→</span>`;
		card.addEventListener("click", () => selectMatiere(key));
		container.appendChild(card);
	});
}

function selectMatiere(key) {
	STATE.matiere = key;
	buildAnnees();
	showPage("page-annee");
}

// ==================== PAGE ANNÉE ====================
function buildAnnees() {
	const container = document.getElementById("annees-list");
	const matiere = window.QUESTIONS[STATE.matiere];
	container.innerHTML = "";
	Object.entries(matiere.annees).forEach(([key, annee]) => {
		const btn = document.createElement("button");
		btn.className = "btn-choix";
		btn.textContent = annee.label;
		btn.addEventListener("click", () => selectAnnee(key));
		container.appendChild(btn);
	});
}

function selectAnnee(key) {
	STATE.annee = key;
	buildSousSections();
	showPage("page-soussection");
}

// ==================== PAGE SOUS-SECTION ====================
function buildSousSections() {
	const container = document.getElementById("soussections-list");
	const annee = window.QUESTIONS[STATE.matiere].annees[STATE.annee];
	container.innerHTML = "";
	Object.entries(annee.sousSections).forEach(([key, ss]) => {
		const card = document.createElement("div");
		card.className = "card-matiere";
		card.innerHTML = `<span>${ss.label}</span><span class="arrow">→</span>`;
		card.addEventListener("click", () => selectSousSection(key));
		container.appendChild(card);
	});
}

function selectSousSection(key) {
	STATE.sousSection = key;
	showPage("page-niveau");
}

// ==================== PAGE NIVEAU ====================
function selectNiveau(niveau) {
	STATE.niveau = niveau;
	const ss =
		window.QUESTIONS[STATE.matiere].annees[STATE.annee].sousSections[
			STATE.sousSection
		];
	const questions = ss[niveau];

	if (!questions || questions.length === 0) {
		alert(
			"Pas encore de questions disponibles pour ce niveau. Revenez bientôt !",
		);
		return;
	}

	STATE.questions = shuffleArray([...questions]);
	STATE.questionIndex = 0;
	STATE.score = 0;
	STATE.reponses = [];

	buildQuiz();
	showPage("page-quiz");
}

// ==================== PAGE QUIZ ====================
function buildQuiz() {
	const q = STATE.questions[STATE.questionIndex];
	const total = STATE.questions.length;
	const index = STATE.questionIndex;

	document.getElementById("quiz-progress").textContent =
		`Question ${index + 1} / ${total}`;
	document.getElementById("quiz-progress-bar").style.width =
		`${(index / total) * 100}%`;
	document.getElementById("quiz-question").textContent = q.question;

	const container = document.getElementById("quiz-reponses");
	container.innerHTML = "";

	if (q.type === "qcm4") {
		q.reponses.forEach((rep, i) => {
			const btn = document.createElement("button");
			btn.className = "btn-reponse";
			btn.textContent = rep;
			btn.addEventListener("click", () => validerReponse(i, btn, q));
			container.appendChild(btn);
		});
	}

	// Cacher le bouton suivant au départ
	document.getElementById("btn-suivant").style.display = "none";
	document.getElementById("quiz-explication").style.display = "none";
}

function validerReponse(indexReponse, btnClique, question) {
	// Désactiver tous les boutons
	document.querySelectorAll(".btn-reponse").forEach((btn) => {
		btn.disabled = true;
	});

	const correct = indexReponse === question.bonne_reponse;

	if (correct) {
		btnClique.classList.add("correct");
		STATE.score++;
	} else {
		btnClique.classList.add("incorrect");
		// Montrer la bonne réponse
		document
			.querySelectorAll(".btn-reponse")
			[question.bonne_reponse].classList.add("correct");
	}

	STATE.reponses.push({
		question: question.question,
		correct,
		indexReponse,
		bonne_reponse: question.bonne_reponse,
	});

	// Afficher explication
	const expDiv = document.getElementById("quiz-explication");
	expDiv.textContent = `💡 ${question.explication}`;
	expDiv.style.display = "block";

	// Afficher bouton suivant
	const btnSuivant = document.getElementById("btn-suivant");
	btnSuivant.style.display = "block";
	btnSuivant.textContent =
		STATE.questionIndex < STATE.questions.length - 1
			? "Question suivante →"
			: "Voir les résultats →";
}

function questionSuivante() {
	STATE.questionIndex++;
	if (STATE.questionIndex < STATE.questions.length) {
		buildQuiz();
	} else {
		buildResultats();
		showPage("page-resultats");
	}
}

// ==================== PAGE RÉSULTATS ====================
function buildResultats() {
	const total = STATE.questions.length;
	const score = STATE.score;
	const pct = Math.round((score / total) * 100);

	document.getElementById("res-score").textContent = `${score} / ${total}`;
	document.getElementById("res-pct").textContent = `${pct}%`;

	// Message selon score
	let message = "";
	if (pct === 100) message = "🏆 Parfait ! Excellent travail !";
	else if (pct >= 75) message = "👏 Très bien ! Quelques points à revoir.";
	else if (pct >= 50) message = "📚 Pas mal, mais des révisions s'imposent !";
	else message = "💪 Courage, continue à réviser !";
	document.getElementById("res-message").textContent = message;

	// Barre de score
	document.getElementById("res-barre").style.width = `${pct}%`;
	document.getElementById("res-barre").style.background =
		pct >= 75
			? "var(--success)"
			: pct >= 50
				? "var(--warning)"
				: "var(--danger)";

	// Détail des réponses
	const detail = document.getElementById("res-detail");
	detail.innerHTML = "";
	STATE.reponses.forEach((r, i) => {
		const q = STATE.questions[i];
		const div = document.createElement("div");
		div.className = `res-item ${r.correct ? "res-correct" : "res-incorrect"}`;
		div.innerHTML = `
      <div class="res-item-header">
        <span class="res-icon">${r.correct ? "✓" : "✗"}</span>
        <span class="res-qtext">${r.question}</span>
      </div>
      ${!r.correct ? `<div class="res-correction">Bonne réponse : <strong>${q.reponses[q.bonne_reponse]}</strong></div>` : ""}
    `;
		detail.appendChild(div);
	});
}

function recommencer() {
	STATE.questionIndex = 0;
	STATE.score = 0;
	STATE.reponses = [];
	STATE.questions = shuffleArray([...STATE.questions]);
	buildQuiz();
	showPage("page-quiz");
}

function retourAccueil() {
	STATE.matiere = null;
	STATE.annee = null;
	STATE.sousSection = null;
	STATE.niveau = null;
	STATE.questions = [];
	showPage("page-accueil");
}

// ==================== UTILS ====================
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
	buildAccueil();
	showPage("page-accueil");
});

// Exposer les fonctions appelées depuis le HTML (onclick)
window.selectNiveau = selectNiveau;
window.questionSuivante = questionSuivante;
window.recommencer = recommencer;
window.retourAccueil = retourAccueil;
window.showPage = showPage;

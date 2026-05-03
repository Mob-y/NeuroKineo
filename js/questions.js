// Exposé sur window pour être accessible depuis app.js (multi-fichiers sans module bundler)
window.QUESTIONS = {
	anatomie: {
		label: "Anatomie & Physiologie",
		annees: {
			1: {
				label: "1ère année",
				sousSections: {
					tissus: {
						label: "Tissus et organes",
						facile: [
							{
								id: "t1_f1",
								type: "qcm4",
								question:
									"Quel type de tissu forme les tendons et les ligaments ?",
								reponses: [
									"Tissu conjonctif",
									"Tissu épithélial",
									"Tissu musculaire",
									"Tissu nerveux",
								],
								bonne_reponse: 0,
								explication:
									"Les tendons et ligaments sont composés de tissu conjonctif dense, riche en fibres de collagène.",
							},
							{
								id: "t1_f2",
								type: "qcm4",
								question:
									"Quelle est la fonction principale du tissu musculaire ?",
								reponses: [
									"Filtrer le sang",
									"Produire des hormones",
									"Permettre le mouvement par contraction",
									"Transmettre des signaux nerveux",
								],
								bonne_reponse: 2,
								explication:
									"Le tissu musculaire est spécialisé dans la contraction, ce qui génère les mouvements du corps.",
							},
							{
								id: "t1_f3",
								type: "qcm4",
								question:
									"Quel tissu recouvre la surface du corps et tapisse les organes internes ?",
								reponses: [
									"Tissu conjonctif",
									"Tissu épithélial",
									"Tissu osseux",
									"Tissu adipeux",
								],
								bonne_reponse: 1,
								explication:
									"Le tissu épithélial forme les revêtements externes (peau) et internes (muqueuses, glandes).",
							},
							{
								id: "t1_f4",
								type: "qcm4",
								question:
									"Combien de types de tissus fondamentaux composent le corps humain ?",
								reponses: ["2", "3", "4", "6"],
								bonne_reponse: 2,
								explication:
									"Le corps humain est constitué de 4 types de tissus fondamentaux : épithélial, conjonctif, musculaire et nerveux.",
							},
							{
								id: "t1_f5",
								type: "qcm4",
								question:
									"Quel tissu est responsable de la transmission des informations dans le corps ?",
								reponses: [
									"Tissu adipeux",
									"Tissu musculaire lisse",
									"Tissu nerveux",
									"Tissu conjonctif",
								],
								bonne_reponse: 2,
								explication:
									"Le tissu nerveux est composé de neurones et de cellules gliales, spécialisés dans la transmission des influx nerveux.",
							},
							{
								id: "t1_f6",
								type: "qcm4",
								question:
									"Quelle protéine est la plus abondante dans le tissu conjonctif ?",
								reponses: ["Actine", "Myosine", "Kératine", "Collagène"],
								bonne_reponse: 3,
								explication:
									"Le collagène est la protéine la plus abondante du tissu conjonctif, assurant résistance et solidité.",
							},
							{
								id: "t1_f7",
								type: "qcm4",
								question: "Quel type de muscle est involontaire et strié ?",
								reponses: [
									"Muscle squelettique",
									"Muscle cardiaque",
									"Muscle lisse",
									"Muscle facial",
								],
								bonne_reponse: 1,
								explication:
									"Le muscle cardiaque est strié comme le muscle squelettique, mais son fonctionnement est involontaire.",
							},
							{
								id: "t1_f8",
								type: "qcm4",
								question: "Où trouve-t-on principalement du tissu adipeux ?",
								reponses: [
									"Dans les os",
									"Dans les nerfs",
									"Sous la peau et autour des organes",
									"Dans les muscles",
								],
								bonne_reponse: 2,
								explication:
									"Le tissu adipeux se situe principalement dans l'hypoderme (sous la peau) et autour de certains organes pour les protéger et les isoler.",
							},
						],
					},
					locomoteur: {
						label: "Appareil locomoteur",
						facile: [
							{
								id: "l1_f1",
								type: "qcm4",
								question: "Quel est le rôle principal des ligaments ?",
								reponses: [
									"Relier un muscle à un os",
									"Relier deux os entre eux",
									"Produire du liquide synovial",
									"Nourrir le cartilage",
								],
								bonne_reponse: 1,
								explication:
									"Les ligaments sont des structures fibreuses qui relient les os entre eux et stabilisent les articulations.",
							},
							{
								id: "l1_f2",
								type: "qcm4",
								question:
									"Comment appelle-t-on la structure qui relie un muscle à un os ?",
								reponses: ["Ligament", "Cartilage", "Tendon", "Fascia"],
								bonne_reponse: 2,
								explication:
									"Le tendon est un cordon fibreux de tissu conjonctif dense qui relie le muscle à l'os.",
							},
							{
								id: "l1_f3",
								type: "qcm4",
								question: "Quelle est la fonction du cartilage articulaire ?",
								reponses: [
									"Produire des globules rouges",
									"Réduire la friction entre les os",
									"Transmettre les signaux nerveux",
									"Stocker du calcium",
								],
								bonne_reponse: 1,
								explication:
									"Le cartilage articulaire recouvre les surfaces osseuses et réduit la friction lors des mouvements articulaires.",
							},
						],
					},
				},
			},
			2: {
				label: "2ème année",
				sousSections: {
					neurologie: {
						label: "Neurologie de base",
						facile: [
							{
								id: "n2_f1",
								type: "qcm4",
								question: "Quelle est la cellule de base du système nerveux ?",
								reponses: [
									"L'astrocyte",
									"Le neurone",
									"L'oligodendrocyte",
									"La cellule de Schwann",
								],
								bonne_reponse: 1,
								explication:
									"Le neurone est l'unité fonctionnelle de base du système nerveux, spécialisé dans la transmission de l'influx nerveux.",
							},
							{
								id: "n2_f2",
								type: "qcm4",
								question: "Que désigne le terme 'SNC' ?",
								reponses: [
									"Système Nerveux Central",
									"Système Neuro-Cortical",
									"Système Nerveux Crânien",
									"Synapse Neuro-Cellulaire",
								],
								bonne_reponse: 0,
								explication:
									"Le SNC (Système Nerveux Central) comprend l'encéphale et la moelle épinière.",
							},
						],
					},
				},
			},
			3: {
				label: "3ème année",
				sousSections: {
					pathologies: {
						label: "Pathologies & Rééducation",
						facile: [
							{
								id: "p3_f1",
								type: "qcm4",
								question: "Qu'est-ce qu'une entorse ?",
								reponses: [
									"Une rupture complète d'un muscle",
									"Une lésion d'un ou plusieurs ligaments",
									"Une fracture de l'os",
									"Une inflammation du tendon",
								],
								bonne_reponse: 1,
								explication:
									"Une entorse est une lésion ligamentaire causée par un mouvement forcé d'une articulation au-delà de ses limites normales.",
							},
							{
								id: "p3_f2",
								type: "qcm4",
								question:
									"Quelle est la différence entre une élongation et une déchirure musculaire ?",
								reponses: [
									"Il n'y a aucune différence",
									"L'élongation touche les tendons, la déchirure les muscles",
									"L'élongation est un étirement sans rupture, la déchirure implique une rupture partielle des fibres",
									"La déchirure est moins grave que l'élongation",
								],
								bonne_reponse: 2,
								explication:
									"L'élongation est un étirement excessif sans rupture de fibres, tandis que la déchirure implique une rupture partielle des fibres musculaires.",
							},
						],
					},
				},
			},
		},
	},
};

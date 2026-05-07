// NeuroKineo — Base de questions
// ⚠️ À valider par un professionnel de santé kinésithérapeute
// Structure : chapitre > niveau > tableau de questions

export const QUESTIONS = {
  osteologie: {
    label: "Ostéologie",
    emoji: "🦴",
    description: "Étude des os et du squelette",
    niveaux: {
      1: [
        {
          id: "os_1_01",
          question: "Combien d'os compose le squelette humain adulte ?",
          reponses: ["186", "206", "226", "246"],
          bonne_reponse: 1,
          explication: "Le squelette humain adulte est composé de 206 os. À la naissance, le bébé en possède environ 270, qui fusionnent progressivement."
        },
        {
          id: "os_1_02",
          question: "Comment appelle-t-on la membrane fibreuse qui enveloppe les os ?",
          reponses: ["L'endoste", "La diaphyse", "Le périoste", "L'épiphyse"],
          bonne_reponse: 2,
          explication: "Le périoste est la membrane conjonctive qui recouvre la surface externe des os. Il joue un rôle essentiel dans la nutrition et la croissance osseuse."
        },
        {
          id: "os_1_03",
          question: "Quelle est la partie centrale allongée d'un os long ?",
          reponses: ["L'épiphyse", "Le périoste", "Le cartilage", "La diaphyse"],
          bonne_reponse: 3,
          explication: "La diaphyse est la partie centrale cylindrique des os longs. Elle est constituée d'os cortical dense et contient la cavité médullaire."
        },
        {
          id: "os_1_04",
          question: "Quel os forme la partie antérieure du thorax ?",
          reponses: ["La clavicule", "Le sternum", "L'omoplate", "Le radius"],
          bonne_reponse: 1,
          explication: "Le sternum est un os plat situé à la partie antérieure du thorax. Il s'articule avec les côtes et la clavicule."
        },
        {
          id: "os_1_05",
          question: "Comment nomme-t-on les extrémités d'un os long ?",
          reponses: ["Les diaphyses", "Les métaphyses", "Les épiphyses", "Les apophyses"],
          bonne_reponse: 2,
          explication: "Les épiphyses sont les deux extrémités élargies d'un os long, recouvertes de cartilage articulaire au niveau des articulations."
        },
        {
          id: "os_1_06",
          question: "Quel os est communément appelé 'rotule' ?",
          reponses: ["Le talus", "La patella", "Le calcanéus", "Le cuboïde"],
          bonne_reponse: 1,
          explication: "La patella (ou rotule) est un os sésamoïde situé à la face antérieure du genou, enchâssé dans le tendon quadricipital."
        },
        {
          id: "os_1_07",
          question: "Combien de vertèbres composent la colonne vertébrale ?",
          reponses: ["24", "31", "33", "36"],
          bonne_reponse: 2,
          explication: "La colonne vertébrale est composée de 33 vertèbres : 7 cervicales, 12 thoraciques, 5 lombaires, 5 sacrées (fusionnées) et 4 coccygiennes (fusionnées)."
        },
        {
          id: "os_1_08",
          question: "Quel est l'os le plus long du corps humain ?",
          reponses: ["Le tibia", "L'humérus", "Le fémur", "Le radius"],
          bonne_reponse: 2,
          explication: "Le fémur est l'os le plus long et le plus solide du corps humain. Il constitue l'os de la cuisse et s'articule avec le bassin et le genou."
        },
        {
          id: "os_1_09",
          question: "Combien de côtes possède le corps humain ?",
          reponses: ["10 paires", "11 paires", "12 paires", "13 paires"],
          bonne_reponse: 2,
          explication: "Le corps humain possède 12 paires de côtes (24 au total). Les 7 premières sont vraies (reliées au sternum), les 3 suivantes sont fausses et les 2 dernières sont flottantes."
        },
        {
          id: "os_1_10",
          question: "Quel os constitue la partie inférieure et postérieure du crâne ?",
          reponses: ["L'os frontal", "L'os pariétal", "L'os occipital", "L'os temporal"],
          bonne_reponse: 2,
          explication: "L'os occipital forme la partie postéro-inférieure du crâne. Il contient le foramen magnum par lequel passe la moelle épinière."
        }
      ]
    }
  },

  myologie: {
    label: "Myologie",
    emoji: "💪",
    description: "Étude des muscles",
    niveaux: {
      1: [
        {
          id: "my_1_01",
          question: "Combien de muscles compose approximativement le corps humain ?",
          reponses: ["Environ 200", "Environ 400", "Environ 600", "Environ 800"],
          bonne_reponse: 2,
          explication: "Le corps humain possède environ 600 muscles squelettiques. Ils représentent environ 40% du poids corporel chez l'homme et 35% chez la femme."
        },
        {
          id: "my_1_02",
          question: "Quelle protéine est responsable de la contraction musculaire avec la myosine ?",
          reponses: ["La kératine", "L'actine", "La fibrine", "La tubuline"],
          bonne_reponse: 1,
          explication: "L'actine et la myosine sont les deux protéines contractiles essentielles du muscle. Leur interaction permet le glissement des filaments et la contraction musculaire."
        },
        {
          id: "my_1_03",
          question: "Comment appelle-t-on la gaine conjonctive qui entoure l'ensemble d'un muscle ?",
          reponses: ["L'endomysium", "Le périmysium", "L'épimysium", "Le fascia"],
          bonne_reponse: 2,
          explication: "L'épimysium est la gaine conjonctive externe qui entoure l'ensemble du muscle. Le périmysium entoure les faisceaux et l'endomysium entoure chaque fibre musculaire."
        },
        {
          id: "my_1_04",
          question: "Quel est le muscle le plus puissant du corps humain ?",
          reponses: ["Le biceps brachial", "Le quadriceps", "Le grand fessier", "Le soléaire"],
          bonne_reponse: 2,
          explication: "Le grand fessier (gluteus maximus) est considéré comme le muscle le plus puissant du corps. Il est essentiel pour l'extension de la hanche et le maintien de la posture érigée."
        },
        {
          id: "my_1_05",
          question: "Quel muscle est responsable de la flexion de l'avant-bras sur le bras ?",
          reponses: ["Le triceps brachial", "Le deltoïde", "Le biceps brachial", "Le brachioradial"],
          bonne_reponse: 2,
          explication: "Le biceps brachial est le principal fléchisseur de l'avant-bras. Il est également supinateur de l'avant-bras et participe à la flexion de l'épaule."
        },
        {
          id: "my_1_06",
          question: "Comment appelle-t-on l'unité fonctionnelle de base du muscle strié ?",
          reponses: ["La myofibrille", "Le sarcomère", "Le sarcoplasme", "Le réticulum"],
          bonne_reponse: 1,
          explication: "Le sarcomère est l'unité contractile de base du muscle strié squelettique. Il est délimité par deux stries Z et contient les filaments d'actine et de myosine."
        },
        {
          id: "my_1_07",
          question: "Quel muscle permet principalement l'extension du genou ?",
          reponses: ["Les ischio-jambiers", "Le quadriceps fémoral", "Le soléaire", "Le poplité"],
          bonne_reponse: 1,
          explication: "Le quadriceps fémoral (composé du droit fémoral, vaste latéral, vaste médial et vaste intermédiaire) est le principal extenseur du genou."
        },
        {
          id: "my_1_08",
          question: "Quel type de muscle est sous contrôle involontaire ?",
          reponses: ["Le muscle squelettique", "Le muscle strié", "Le muscle lisse", "Le muscle facial"],
          bonne_reponse: 2,
          explication: "Le muscle lisse est sous contrôle involontaire du système nerveux autonome. On le retrouve dans les parois des organes creux, des vaisseaux sanguins et du tube digestif."
        },
        {
          id: "my_1_09",
          question: "Quel muscle est le principal fléchisseur plantaire du pied ?",
          reponses: ["Le tibial antérieur", "Le long péronier", "Le triceps sural", "L'extenseur commun"],
          bonne_reponse: 2,
          explication: "Le triceps sural (composé du gastrocnémien et du soléaire) est le principal fléchisseur plantaire. Il est essentiel pour la marche, la course et le saut."
        },
        {
          id: "my_1_10",
          question: "Comment nomme-t-on la jonction entre un nerf moteur et une fibre musculaire ?",
          reponses: ["La synapse", "La plaque motrice", "Le nœud de Ranvier", "Le fuseau neuromusculaire"],
          bonne_reponse: 1,
          explication: "La plaque motrice (ou jonction neuromusculaire) est la zone de contact spécialisée entre le motoneurone et la fibre musculaire. C'est là que l'acétylcholine déclenche la contraction."
        }
      ]
    }
  },

  neurologie: {
    label: "Neurologie",
    emoji: "🧠",
    description: "Étude du système nerveux",
    niveaux: {
      1: [
        {
          id: "ne_1_01",
          question: "Quelle est la vitesse de conduction d'un influx nerveux dans une fibre myélinisée ?",
          reponses: ["1 à 5 m/s", "10 à 30 m/s", "70 à 120 m/s", "200 à 300 m/s"],
          bonne_reponse: 2,
          explication: "Dans une fibre myélinisée, la conduction saltatoire permet des vitesses de 70 à 120 m/s. Dans les fibres non myélinisées, la vitesse est bien plus lente (0,5 à 2 m/s)."
        },
        {
          id: "ne_1_02",
          question: "Quel neurotransmetteur est libéré à la jonction neuromusculaire ?",
          reponses: ["La dopamine", "La sérotonine", "L'acétylcholine", "La noradrénaline"],
          bonne_reponse: 2,
          explication: "L'acétylcholine est le neurotransmetteur libéré par les motoneurones à la jonction neuromusculaire. Elle se fixe sur les récepteurs nicotiniques et déclenche la contraction."
        },
        {
          id: "ne_1_03",
          question: "Combien de paires de nerfs crâniens possède l'être humain ?",
          reponses: ["10 paires", "12 paires", "14 paires", "16 paires"],
          bonne_reponse: 1,
          explication: "L'être humain possède 12 paires de nerfs crâniens, numérotés de I à XII. Ils émergent directement de l'encéphale et innervent principalement la tête et le cou."
        },
        {
          id: "ne_1_04",
          question: "Quelle partie du cerveau coordonne l'équilibre et les mouvements fins ?",
          reponses: ["Le thalamus", "L'hypothalamus", "Le cervelet", "Le bulbe rachidien"],
          bonne_reponse: 2,
          explication: "Le cervelet coordonne les mouvements volontaires, l'équilibre et le tonus musculaire. Une atteinte cérébelleuse provoque une ataxie (troubles de la coordination)."
        },
        {
          id: "ne_1_05",
          question: "Comment appelle-t-on les cellules gliales qui produisent la myéline dans le SNC ?",
          reponses: ["Les cellules de Schwann", "Les astrocytes", "Les oligodendrocytes", "Les cellules microgliales"],
          bonne_reponse: 2,
          explication: "Les oligodendrocytes produisent la myéline dans le système nerveux central. Dans le SNP, c'est le rôle des cellules de Schwann."
        },
        {
          id: "ne_1_06",
          question: "Quel est le rôle du liquide cérébrospinal (LCS) ?",
          reponses: [
            "Transporter l'oxygène au cerveau",
            "Protection mécanique et métabolique de l'encéphale",
            "Produire les neurotransmetteurs",
            "Réguler la température corporelle"
          ],
          bonne_reponse: 1,
          explication: "Le LCS protège mécaniquement l'encéphale et la moelle épinière contre les chocs, assure des échanges métaboliques et élimine les déchets du tissu nerveux."
        },
        {
          id: "ne_1_07",
          question: "Quel nerf innerve le muscle deltoïde ?",
          reponses: ["Le nerf radial", "Le nerf axillaire", "Le nerf musculo-cutané", "Le nerf médian"],
          bonne_reponse: 1,
          explication: "Le nerf axillaire (ou circonflexe) issu du plexus brachial (C5-C6) innerve le muscle deltoïde et le petit rond. Sa lésion entraîne une paralysie de l'abduction de l'épaule."
        },
        {
          id: "ne_1_08",
          question: "Quelle structure sépare le système nerveux central du sang ?",
          reponses: [
            "La dure-mère",
            "La pie-mère",
            "La barrière hémato-encéphalique",
            "L'arachnoïde"
          ],
          bonne_reponse: 2,
          explication: "La barrière hémato-encéphalique (BHE) est une barrière sélective formée par les cellules endothéliales des capillaires cérébraux. Elle protège le SNC des substances nocives."
        },
        {
          id: "ne_1_09",
          question: "Combien de paires de nerfs rachidiens possède l'être humain ?",
          reponses: ["21 paires", "31 paires", "41 paires", "51 paires"],
          bonne_reponse: 1,
          explication: "Il existe 31 paires de nerfs rachidiens : 8 cervicales, 12 thoraciques, 5 lombaires, 5 sacrées et 1 coccygienne. Chacun émerge de la moelle épinière par une racine antérieure (motrice) et postérieure (sensitive)."
        },
        {
          id: "ne_1_10",
          question: "Quel plexus nerveux innerve le membre inférieur ?",
          reponses: ["Le plexus brachial", "Le plexus cervical", "Le plexus lombo-sacré", "Le plexus solaire"],
          bonne_reponse: 2,
          explication: "Le plexus lombo-sacré innerve le membre inférieur. Il comprend le plexus lombaire (L1-L4) et le plexus sacré (L4-S3), donnant notamment le nerf fémoral et le nerf sciatique."
        }
      ]
    }
  },

  arthrologie: {
    label: "Arthrologie",
    emoji: "🦵",
    description: "Étude des articulations",
    niveaux: {
      1: [
        {
          id: "ar_1_01",
          question: "Comment appelle-t-on une articulation qui ne permet aucun mouvement ?",
          reponses: ["Une diarthrose", "Une amphiarthrose", "Une synarthrose", "Une énarthrose"],
          bonne_reponse: 2,
          explication: "Une synarthrose (ou articulation fibreuse) est une articulation immobile. Exemple : les sutures du crâne. Les diarthroses sont mobiles et les amphiarthroses sont semi-mobiles."
        },
        {
          id: "ar_1_02",
          question: "Quel liquide lubrifie les articulations synoviales ?",
          reponses: ["Le plasma sanguin", "Le liquide synovial", "Le liquide cérébrospinal", "La lymphe"],
          bonne_reponse: 1,
          explication: "Le liquide synovial est produit par la membrane synoviale. Il lubrifie l'articulation, nourrit le cartilage articulaire et absorbe les chocs."
        },
        {
          id: "ar_1_03",
          question: "Quelle est la structure qui recouvre les surfaces articulaires des os ?",
          reponses: ["Le périoste", "Le ménisque", "Le cartilage hyalin", "La bourse séreuse"],
          bonne_reponse: 2,
          explication: "Le cartilage hyalin recouvre les surfaces articulaires. Il est lisse, avasculaire et permet de réduire les frottements et d'absorber les contraintes mécaniques."
        },
        {
          id: "ar_1_04",
          question: "Comment appelle-t-on l'articulation de l'épaule ?",
          reponses: ["Une ginglyme", "Une énarthrose", "Une trochoïde", "Une condylarthrose"],
          bonne_reponse: 1,
          explication: "L'articulation de l'épaule est une énarthrose (articulation sphéroïde). La tête humérale s'articule avec la glène de la scapula, permettant des mouvements dans tous les plans."
        },
        {
          id: "ar_1_05",
          question: "Quel est le rôle des ménisques du genou ?",
          reponses: [
            "Produire du liquide synovial",
            "Relier le fémur au tibia",
            "Améliorer la congruence articulaire et absorber les chocs",
            "Stabiliser la patella"
          ],
          bonne_reponse: 2,
          explication: "Les ménisques médial et latéral améliorent la congruence entre le fémur et le tibia, absorbent les chocs, distribuent les charges et stabilisent l'articulation."
        },
        {
          id: "ar_1_06",
          question: "Quelle articulation est une trochoïde (pivot) ?",
          reponses: [
            "L'articulation du coude (huméro-ulnaire)",
            "L'articulation radio-ulnaire proximale",
            "L'articulation de la hanche",
            "L'articulation métacarpo-phalangienne"
          ],
          bonne_reponse: 1,
          explication: "L'articulation radio-ulnaire proximale est une trochoïde (pivot). Elle permet la rotation de la tête radiale autour de l'ulna, permettant la prono-supination de l'avant-bras."
        },
        {
          id: "ar_1_07",
          question: "Qu'est-ce qu'une bourse séreuse ?",
          reponses: [
            "Un type d'articulation cartilagineux",
            "Une poche remplie de liquide réduisant les frictions",
            "Un renforcement capsulaire",
            "Un type de cartilage articulaire"
          ],
          bonne_reponse: 1,
          explication: "Une bourse séreuse est une poche remplie de liquide synovial qui réduit les frictions entre les tendons, muscles et os. Son inflammation s'appelle une bursite."
        },
        {
          id: "ar_1_08",
          question: "Comment appelle-t-on les ligaments qui croisent à l'intérieur du genou ?",
          reponses: [
            "Les ligaments collatéraux",
            "Les ligaments ménisco-fémoraux",
            "Les ligaments croisés",
            "Les ligaments patellaires"
          ],
          bonne_reponse: 2,
          explication: "Les ligaments croisés antérieur (LCA) et postérieur (LCP) sont situés à l'intérieur de la capsule du genou. Ils contrôlent les translations antéro-postérieures du tibia."
        },
        {
          id: "ar_1_09",
          question: "Quel mouvement est réalisé quand on rapproche un membre de l'axe du corps ?",
          reponses: ["L'abduction", "La flexion", "L'adduction", "La rotation"],
          bonne_reponse: 2,
          explication: "L'adduction est le mouvement qui rapproche un segment du plan médian du corps. L'abduction est le mouvement inverse qui l'en éloigne."
        },
        {
          id: "ar_1_10",
          question: "Quelle est la caractéristique principale d'une articulation synoviale ?",
          reponses: [
            "Elle est totalement immobile",
            "Elle contient une cavité articulaire remplie de liquide synovial",
            "Elle est uniquement reliée par du cartilage",
            "Elle ne possède pas de capsule articulaire"
          ],
          bonne_reponse: 1,
          explication: "Une articulation synoviale (diarthrose) possède une cavité articulaire contenant du liquide synovial, une capsule articulaire et des surfaces recouvertes de cartilage hyalin."
        }
      ]
    }
  }
}
import spacy
from spacy.lang.fr.stop_words import STOP_WORDS

# Charger le modèle de langue français de Spacy
nlp = spacy.load("fr_core_news_lg")

# Texte à résumer
texte = """Wall Street repasse dans le rouge avant bourse ce vendredi, au lendemain d'un rallye mené par le Nasdaq (+2,5%) et suivi par le Dow Jones (+1,2%). Le S&P 500 cède 0,5%, le DJIA 0,6% et le Nasdaq 0,2% en pré-séance, alors que les opérateurs hésitent toujours dans un climat de tension sur fond de crise bancaire. La tendance pourrait donc rester volatile, d'autant que la réunion de la Fed des 21-22 mars se rapproche grandement. Sur le Nymex, le baril de brut WTI abandonne 1,6% à 67,3$. L'once d'or gagne 1,4% à 1.949$. L'indice dollar fléchit de 0,2% face à un panier de devises de référence.

C'est la journée des Quatre Sorcières ce vendredi à Wall Street, ce qui entraîne parfois une volatilité accrue des marchés. Cet événement boursier, qui intervient 4 fois par an (les 3èmes vendredis de mars, juin, septembre et décembre), correspond à l'arrivée à échéance simultanée de 4 types de contrats : les options sur indices et sur actions, ainsi que les contrats à terme sur les indices et les actions.

Du côté des statistiques, les chiffres de la production industrielle américaine du mois de février seront communiqués à 14h15 (consensus +0,4% en comparaison du mois antérieur, +0,2% pour la production manufacturière et 78,4% de taux d'utilisation des capacités selon FactSet). L'indice des indicateurs avancés du Conference Board pour le mois de février sera révélé à 15 heures (consensus FactSet -0,2%). L'indice préliminaire du sentiment des consommateurs américains de l'Université du Michigan pour le mois de mars sera lui aussi connu à 15 heures (consensus 67).

La séance devrait s'avérer encore compliquée. FedEx a convaincu hier soir par ses derniers comptes, malgré la baisse des revenus. La fébrilité domine par ailleurs toujours sur le secteur bancaire, les dossiers Credit Suisse et First Republic Bank demeurant en première ligne malgré les soutiens de la BNS pour la banque suisse et de JP Morgan et ses pairs pour la banque régionale américaine.

La Fed a publié les soldes de réserves mis à jour des institutions de dépôt pour la semaine terminée le 15 mars. La mise à jour indique qu'au 15 mars, 11,94 milliards de dollars ont été empruntés dans le cadre du programme de financement à terme de la Banque (BTFP) qui a été déployé dimanche. Un rapport Bloomberg note que les emprunts à la fenêtre d'escompte ont augmenté de 148,2 milliards de dollars au cours de la semaine - à 152,8 milliards de dollars contre un record de 111 milliards de dollars pour la crise financière de 2008. Enfin, le bilan de la Fed, qui était en voie de réduction via le resserrement quantitatif, va effacer les efforts opérés depuis juin, craignent plusieurs spécialistes.

Selon l'outil FedWatch du CME Group, la Fed devrait toutefois relever ses taux d'un quart de point le 22 mars (probabilité de 76% contre 24% de chances d'un statu quo). Le même outil prévoit pour le 3 mai une fourchette de 5-5,25% (probabilité de 52%) ou une fourchette de 4,75-5% (40% de chances). Pour le 14 juin, la plus grande probabilité est celle d'une fourchette 4,75-5% (à 47%), devant l'hypothèse d'une fourchette 5-5,25% (23% de probabilité).

En Asie ce matin, l'indice chinois SSE Composite a repris 0,7% à 3.250 pts. La Banque populaire de Chine a réduit le ratio de réserves obligatoires (RRR) imposé aux banques de 25 points de base, ce qui prendra effet à compter du 27 mars, dans le but de stimuler l'économie chinoise. La réduction de 25 points de base s'appliquera à presque toutes les banques et fait suite à une réduction de 25 points de base pour toutes les banques en décembre. Rappelons que la banque a promis de rendre sa politique "précise et énergique" cette année pour soutenir l'économie, en maintenant des liquidités raisonnablement abondantes et en réduisant les coûts de financement des entreprises. Un RRR inférieur signifie que les banques auront plus de fonds disponibles pour les prêts, ce qui soutiendra la croissance économique. La PBoC a noté un RRR moyen pondéré pour les institutions financières à environ 7,6% après la nouvelle réduction. Cette réduction exclura les institutions financières qui ont mis en place un RRR de 5%.

Notons enfin que des discussions seraient lancées concernant une potentielle cession de TikTok, selon le New York Post, citant des sources. le réseau social chinois échangerait donc avec des acquéreurs potentiels, suite aux pressions américaines.

Les chiffres finaux de l'inflation européenne du mois de février n'ont pas surpris ce vendredi. L'indice des prix à la consommation a progressé de 8,5% en rythme annuel le mois de février selon Eurostat, niveau en ligne avec la lecture préliminaire, après une progression de 8,6% en janvier. La baisse des coûts énergétiques a été compensée par une hausse des prix dans presque tous les autres catégories. Sur un mois, les prix ont augmenté de 0,8%. Hors alimentation et énergie, l'indicateur s'affiche en hausse de 7,4% sur un an contre 7,1% en janvier. L'indice final ajusté ('core' CPI) a progressé comme attendu de 5,6%, en ligne avec la lecture flash.

Rappelons que la Banque centrale européenne a relevé hier ses taux de 50 points de base supplémentaires et que ses nouvelles prévisions d'inflation sont de 4,6% en 2023 puis 2,5% en 2024 et 2,2% en 2025.

Les valeurs

Amgen, le géant biotechnologique américain, a annoncé hier son intention de supprimer 450 emplois, ce qui représente moins de 2% de ses effectifs. Il s'agit du deuxième plan de licenciements du laboratoire cette année. Le groupe fait face en effet à une pression accrue sur les prix des médicaments, dans un contexte d'inflation par ailleurs élevée.

US Steel, le géant américain de la sidérurgie, grimpe à Wall Street ce vendredi, sur des prévisions supérieures aux attentes. United States Steel Corporation a donc publié ses prévisions pour le premier trimestre 2023, évoquant un Ebitda ajusté d'environ 375 millions de dollars. Le bénéfice net ajusté par action diluée du premier trimestre 2023 devrait se situer entre 0,58$ et 0,63$. "La dynamique continue de se développer sur le marché nord-américain des produits laminés plats", a commenté le DG du groupe, David B. Burritt. "Une solide performance en matière de sécurité et d'exploitation, l'amélioration de la saisie des commandes et notre concentration continue sur la conquête de parts de marché sur les marchés stratégiques se traduisent par des prévisions meilleures que prévu pour le premier trimestre. Nous prévoyons que ces tendances se poursuivront au deuxième trimestre compte tenu de l'allongement des délais de livraison et du flux des prix de vente plus élevés".

FedEx, le géant américain de la livraison de colis, bondit à Wall Street hier suite à sa publication financière trimestrielle. Les revenus du groupe sont ressortis pourtant inférieurs aux attentes, mais les actions de réduction des coûts ont porté leurs fruits et soutenu les marges. Malgré le ralentissement des livraisons, le groupe a rehaussé ses estimations de bénéfices. Les revenus trimestriels ont chuté de 6% à 22,2 milliards de dollars et manqué le consensus. Sur ce troisième trimestre fiscal, clos fin février, le bénéfice ajusté a toutefois atteint 865 millions de dollars soit 3,41$ par titre, supérieur de près de 20% au consensus. Le management indique que les conditions de marché devraient encore affecter les revenus et les profits opérationnels sur le trimestre en cours. FedEx étudie par conséquent la moindre économie.

Les effectifs devraient ressortir en baisse de 25.000 postes sur l'exercice fiscal se terminant en mai, soit un recul de 4,6% des effectifs salariés à temps plein et à temps partiel. FedEx comptait près de 550.000 employés à la fin de l'exercice antérieur... Pour l'exercice clos fin mai, le groupe table sur un bpa ajusté allant de 14,6 à 15,2$, contre une guidance antérieure de 13 à 14$ et un consensus de 13,6$.

Baidu, le géant chinois de l'internet, gagne encore du terrain avant bourse à Wall Street. Le groupe surtout connu pour son moteur de recherche a indiqué qu'il avait obtenu un permis pour fournir un service de transport entièrement sans conducteur dans la capitale chinoise de Pékin. Ainsi, le service Apollo de Baidu déploiera 10 véhicules entièrement autonomes dans un parc technologique développé par le gouvernement de Pékin. En décembre, Baidu avait précisé avoir obtenu une licence pour tester le service. Baidu exploitera désormais des services de robotaxi sans conducteur dans trois villes chinoises, dont Wuhan et Chongqing. Parmi les autres projets de diversification du groupe, Baidu a présenté Ernie Bot cette semaine, un chatbot d'intelligence artificielle visant à concurrencer ChatGPT.

First Republic Bank a rebondi hier soir de 10% en fin de séance à 34,3$ environ suite à l'annonce d'un soutien des grandes banques menées par JP Morgan, qui vont apporter 30 milliards de dollars de dépôts non assurés afin de rassurer les clients. Le titre retombait toutefois après bourse, First Republic faisant état de la suppression de son dividende - décision pourtant évidente compte tenu de la crise actuelle. Le plan de 30 milliards de dollars de dépôts implique 11 banques et fait suite aux échanges entre Jamie Dimon, directeur général de JP Morgan Chase, Jerome Powell, patron de la Fed, et Janet Yellen, Secrétaire US au Trésor.

C'est Dimon qui aurait pris l'initiative, contactant ensuite les banques, comprenant Citigroup, Bank of America et Wells Fargo. Ces trois principaux alliés de JP Morgan se sont engagés à placer 5 milliards de dollars de dépôts chez First Republic, ce que fera également la banque de Jamie Dimon. Cela correspondait déjà à une "infusion" de 20 milliards de dollars, à laquelle se sont ajoutés US Bancorp, Bank of New York Mellon, Truist, State Street et PNC pour 1 milliard de dollars chacun, puis Morgan Stanley et Goldman Sachs pour 2,5 milliards de dollars chacun.

Cette circulation du capital vise à sauver First Republic Bank, l'une des banques régionales les plus attaquées depuis la chute de la Silicon Valley Bank et de Signature Bank. Les dépôts des grandes banques chez First Republic devront par ailleurs être maintenus pendant 120 jours et rapporteront à JP Morgan et ses pairs les mêmes intérêts que ceux des déposants actuels. Après bourse hier soir à Wall Street, le titre First Republic restait très volatil et retombait. Il est attendu pour l'heure en retrait de 22% ce jour, signalant un certain malaise malgré cette nouvelle tentative de sauvetage. Dans le même temps, le Wall Street Journal relève que des dirigeants de la banque ont vendu pour 12 millions de dollars de titres dans les mois précédant la crise bancaire.

L'investisseur activiste Bill Ackman, abasourdi par ce sauvetage de First Republic, a apostrophé encore Janet Yellen il y a quelques heures sur Twitter. "Janet Yellen a apparemment poussé les SIB (banques systémiques) à recycler certains des dépôts qu'ils ont reçus de First Republic de retour dans FRB pendant 120 jours. Le résultat est que le risque de défaut FRB est désormais réparti sur nos plus grandes banques. Répartir le risque de contagion financière pour créer un faux sentiment de confiance dans FRB est une mauvaise politique. Les SIB n'auraient jamais fait cet investissement à faible rendement dans les dépôts à moins qu'elles n'aient été poussées à le faire et sans l'assurance que les dépôts FRB seraient soutenus en cas d'échec"."""

# Analyser le texte avec Spacy
doc = nlp(texte)

# Calculer le score de pertinence de chaque phrase dans le texte
scores = {}
for sent in doc.sents:
    for token in sent:
        if token.text.lower() not in STOP_WORDS:
            if sent not in scores:
                scores[sent] = token.similarity(nlp(token.text.lower()))
            else:
                scores[sent] += token.similarity(nlp(token.text.lower()))

# Sélectionner les phrases les plus importantes
n_sentences = 2 # Nombre de phrases souhaitées dans le résumé
summary = []
for sent, score in sorted(scores.items(), key=lambda x: x[1], reverse=True)[:n_sentences]:
    summary.append(sent.text)

# Générer le résumé en combinant les phrases sélectionnées
summary_text = " ".join(summary)
print(summary_text)
# SAE-S2-01
SAE-S2-01

GROUPE 110 : SHAMSHDINE LINA, DIALLO HADJA, VAN THUY LINH

Afin d'offrir une expérience utilisateur plus immersive et professionnelle, nous avons enrichi le projet initial en intégrant deux fonctionnalités majeures : un système de retour sonore dynamique et une interface de résultat interactive. 

1. Système d'Effets Sonores Immersifs
Cette fonctionnalité a été conçue pour fournir des retours sensoriels immédiats (Feedback Loop) lors de chaque interaction du joueur.
- Implémentation : Utilisation de l'objet natif Audio de JavaScript pour précharger et gérer les fichiers .mp3.
- Événements sonores :
• flip : Joué lors du retournement d'une carte.
• match : Signal sonore gratifiant pour une paire trouvée.
• win : Fanfare de victoire.
• timeout : Alerte sonore en cas de fin de chrono.
- Objectif : Renforcer l'engagement de l'utilisateur et rendre le jeu plus vivant.
  
2. Panneau de Résultat Interactif (Modal)
Nous avons remplacé les boîtes de dialogue standards du navigateur par un panneau de fin de partie personnalisé, injecté dynamiquement dans le DOM.
- Design Moderne : Utilisation d'un overlay semi-transparent avec un effet de flou (backdrop-filter: blur()) pour une esthétique épurée.
- Gestion des États : Le contenu s'adapte dynamiquement selon l'issue de la partie (Victoire, Temps écoulé ou Abandon).
- Options de Rejouabilité : L'intégration de boutons "Rejouer" (relance la logique sans rechargement) et "Accueil" permet une navigation fluide au sein de l'application.

3.Ajout d'une nouvelle collection d'images(Cakes)
Nous avons ajouter une nouvelle collection d’images au jeu sur le thème des cakes et pâtisseries 
En plus des collections déjà présentes :
voitures ;
animaux ;
fruits;
Le joueur peut désormais sélectionner une collection “Cakes” depuis le menu déroulant du formulaire d’accueil.
Cette collection ajoute plusieurs images de gâteaux et pâtisseries utilisées pour générer les cartes du plateau de jeu et ainsi varier l'expérience.

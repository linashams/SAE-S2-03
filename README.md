# SAE-S2-01
SAE-S2-01 

GROUPE 110 : SHAMSHUDINE Lina, DIALLO Hadja, VAN Thuy Linh

Plongez dans notre jeu du Memory !

Qui ne connaît pas le célebre jeu du Memory ? Ce jeu, nous l'avons revisité afin que vous y deveniez accro. 

Découvrez notre univers kawaii ou l'expérience utilisateur est au coeur de notre préocupation. Ainsi nous avons enrichi le projet initial en intégrant deux fonctionnalités majeures : un système de retour sonore dynamique et une interface de résultat interactive. 

1. Système d'Effets Sonores Immersifs
   
Cette fonctionnalité a été conçue pour fournir des retours sensoriels immédiats (Feedback Loop) lors de chaque interaction du joueur.
- Implémentation : Utilisation de l'objet natif Audio de JavaScript pour précharger et gérer les fichiers .mp3.
- Événements sonores :
• flip : Joué lors du retournement d'une carte.
• match : Signal sonore gratifiant pour une paire trouvée.
• win : Fanfare de victoire.
• timeout : Alerte sonore en cas de fin de chrono.
- Objectif : Renforcer l'engagement de l'utilisateur et rendre le jeu plus vivant et interactif.
  
2. Panneau de Résultat Interactif 
   
Nous avons remplacé les boîtes de dialogue standards du navigateur par un panneau de fin de partie personnalisé, injecté dynamiquement dans le DOM.
- Design Moderne : Utilisation d'un overlay semi-transparent avec un effet de flou (backdrop-filter: blur()) pour une esthétique épurée.
- Gestion des États : Le contenu s'adapte dynamiquement selon l'issue de la partie (Victoire, Temps écoulé ou Abandon).
- Options de Rejouabilité : L'intégration de boutons "Rejouer" (relance la logique sans rechargement) et "Accueil" permet une navigation fluide au sein de l'application.

3. Bouton "Niveau Suivant" dans le Panneau de Résultat

   Ce bouton permet ainsi d'améliorer l'expérience utilisateur et de renforcer son engagement

4. Ajout d'une nouvelle collection d'images (Cakes)
   
Nous avons ajouter une nouvelle collection d’images au jeu sur le thème des cakes et pâtisseries 
En plus des collections déjà présentes :
voitures ;
animaux ;
fruits;
Le joueur peut désormais sélectionner une collection “Cakes” depuis le menu déroulant du formulaire d’accueil.
Cette collection ajoute plusieurs images de gâteaux et pâtisseries utilisées pour générer les cartes du plateau de jeu et ainsi varier l'expérience et renforcer l'univers kawaii de notre jeu.

5. Ajout d'un système de score dynamique

Afin d'ajouter un aspect compétitif au jeu, nous avons implémenté un algorithme de calcul de score. Ce système récompense les joueurs en fonction de leur rapidité (temps restant) et du niveau de difficulté choisi. Cela augmente considérablement la rejouabilité de l'application sans complexifier l'architecture du code existant.

6. Importation d'image à partir de la galerie

L'utilisateur peut importer ses propres photos afin d'avoir un jeu totalement personnalisé.

7. Système de classement

Un système de classement est mis en place. Ainsi, à la fin de la partie l'utilisateur peut voir si il fait partie du top 3 des meilleurs scores obtenus par niveau.

8. Système de combo
Lorsque l'utilisateur trouve plusieurs paire à la suite, son score augmente considéralement. Plus il enchaîne les paires, plus le score a une grande augmentation.

9. Bouton indice

Si l'utilisateur passe plus de 7 secondes sans trouver de paires, un bouton d'indice apparait. Si l'utilisateur appuie dessus, les cartes se retournet durant 1 seconde

10. 2ème mode de jeu : le memori par paires de 4

Un autre mode de jeu, proposant les mêmes fonctionnalités, est proposé. Cependant, l'utilisateur ne doit plus trouver deux cartes identiques mais 4 cartes identiques 

11. 3ème mode de jeu : le crazy game

Le jeu du memori est revisité ! on retrouve deux nouvelles cartes dans le jeu . une carte STOP qui arrête la partie si elle est retournée, une carte chrono qui rajoute du temps suplémentaires. 
Lorsque l'utilisateur choisit ce mode de jeu, il est libre de sélectionner si les trois foctionnalités vont être présentes ou non durant la partie. En effet, en plus des deux nouvelles cartes présentes, une nouvelle  fonctionnalité qui entraîne un mélange de cartes toute les 15 secondes peut être également sélectionnée

12. Des commentaires encourageants !

Lors de la partie, l'utilisateur reçoit divers commentaires en fonntion de ses agissements : qu'il se trompe sur une seule paire, qu'il enchaîne les erreurs ou qu'il trouve une ou plusieurs paires. Ainsi, il se sent encouragé et stimulé tout au long du jeu !

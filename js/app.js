import {DOMManager} from './DOMManager.js';
import {Game} from './Game.js';
import {ApiService} from './ApiService.js';

const domManager = new DOMManager();
const game = new Game();

domManager.renderSetupForm('.setup-form', async (event) => {
    event.preventDefault();
});

/**
 * Gestionnaire d'événement pour la soumission du formulaire de jeu.
 * Cette fonction initialise la partie via l'API et lance l'interface de jeu.
 */
document.querySelector('.game-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Récupération des données saisies par l'utilisateur
    const pseudo = document.getElementById('pseudo').value;
    const difficulty = document.getElementById('difficulty').value;
    const collectionName = document.getElementById('collection').value;

    try {
        const data = await ApiService.createGame(pseudo, difficulty);
        console.log('Success:', data, data.id);

        // Transition de l'interface utilisateur
        domManager.hideForm(); // Masque le formulaire de configuration
        domManager.showGamePanel(pseudo, data.id, difficulty); // Affiche la barre d'infos du jeu

        // Lance la logique de la partie avec les données reçues
        game.startGame(data.id, difficulty, collectionName);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Erreur lors de la création de la partie');
    }
});

import {imageCollections} from './ImageCollection.js';
import {ApiService} from './ApiService.js';
import {DOMManager} from './DOMManager.js';


export class Game {
    /**
     * @type {number} id identifiant de la partie en cours
     */
    #id;
    #difficulty;
    #collection;
    #nombreCoupsRestant;
    #cartesRetournees = [];
    #timerInterval = null;
    #tempsRestant = 30;
    #verrouillage = false;
    #domManager
    #isProcessing = false;

    // Initialise le gestionnaire du DOM lors de la création de l'instance
    constructor() {
        this.#domManager = new DOMManager();
    }

    // Dictionnaire des effets sonores
    #sounds = {
        flip: new Audio('assets/sounds/flip.mp3'),
        match: new Audio('assets/sounds/match.mp3'),
        win: new Audio('assets/sounds/win.mp3'),
        timeout: new Audio('assets/sounds/timeout.mp3')
    };

    /**
     * Joue un son spécifique à partir du dictionnaire.
     * @param {string} name - Le nom du son ('flip', 'match', etc.)
     * @private
     */
    #playSound(name) {
        const sound = this.#sounds[name];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.warn("Lecture audio impossible", e));
        }
    }

    /**
     * Calcule le niveau de difficulté suivant
     * @param {number} current - Difficulté actuelle (4, 5, 6 ou 8)
     * @returns {number|null} La difficulté suivante ou null si max
     * @private
     */
    #getNextDifficulty(current) {
        if (current === 4) return 5;
        if (current === 5) return 6;
        if (current === 6) return 8;
        return null;
    }
    /**
     * Affiche l'écran de fin de partie avec les options "Rejouer" ou "Accueil"
     * @param {boolean} isWin - Indique si le joueur a gagné.
     * @param {boolean} [isAbandon=false] - Indique si la partie s'est terminée par un abandon.
     */
    showGameOver(isWin, isAbandon = false) {
        this.#isProcessing = true;
        clearInterval(this.#timerInterval);

        const board = document.querySelector('.game-board');
        if (!board) return;

        let title = isWin ? "Félicitations !" : "Temps écoulé !";
        let message = isWin
            ? `Vous avez gagné ! Temps restant :  ${this.#tempsRestant}s`
            : "Dommage, vous n'avez pas réussi à temps";

        if (isAbandon) {
            title = "Abandonné !";
            message = "Vous avez quitté la partie";
        }

        //Constantes pour le bouton Niveau Suivant
        const currentDiff = parseInt(this.#difficulty);
        const nextDiff = this.#getNextDifficulty(currentDiff);
        const showNextButton = isWin && nextDiff !== null;

        const panelHTML = `
        <div id="result-overlay" class="result-overlay">
            <div class="result-box">
                <h2>${title}</h2>
                <p>${message}</p>
                <div class="panel-buttons">
                
                    ${showNextButton ? `<button class="btn-panel btn-nivsuiv" id="btn-niveau-suivant">Niveau Suivant</button>` : ''} 
                    <button class="btn-panel btn-restart" id="btn-retry">Rejouer</button>
                    <button class="btn-panel btn-home" id="id-accueil">Accueil</button>
                </div>
            </div>
        </div>
    `;

        board.insertAdjacentHTML('beforeend', panelHTML);

        if (showNextButton) {
            const btnSuivant = document.getElementById('btn-niveau-suivant');
            if (btnSuivant) {
                btnSuivant.onclick = async () => {
                    document.getElementById('result-overlay').remove();

                    try {
                        // Crée une nouvelle partie sur l'API avec la nouvelle difficulté
                        const newId = await ApiService.createGame(document.querySelector('#pseudo')?.value || "Joueur", nextDiff);

                        // Met à jour l'IHM
                        this.#domManager.showGamePanel(document.querySelector('#pseudo')?.value || "Joueur", newId, `${nextDiff} paires`);

                        // Relance le jeu
                        this.startGame(newId, nextDiff, this.#collection);
                    } catch (error) {
                        console.error("Impossible de lancer le niveau suivant via l'API", error);
                        // Secours si l'API ne répond pas
                        this.startGame(this.#id + 1, nextDiff, this.#collection);
                    }
                };
            }
        }


        document.getElementById('btn-retry').onclick = () => {
            document.getElementById('result-overlay').remove();
            this.startGame(this.#id, this.#difficulty, this.#collection);
        };

        document.getElementById('id-accueil').onclick = () => {
            location.reload();
        };
    }

    // Configure l'événement sur le bouton d'abandon
    setupAbandonButton() {
        const btnAbandon = document.getElementById('abandon');
        if (!btnAbandon) return;

        btnAbandon.onclick = () => {
            this.showGameOver(false, true);
        };
    }

    // Termine la partie et met à jour les données sur l'API
    async endGame() {
        if (this.#timerInterval) {
            clearInterval(this.#timerInterval);
        }

        const gameID = this.#id;
        const nombreCoupsRestant = this.#nombreCoupsRestant;

        try {
            const result = await ApiService.updateGameResult(gameID, nombreCoupsRestant);
            console.log('Fin de partie:', result);
            const isWin = (nombreCoupsRestant === 0);
            this.showGameOver(isWin);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Erreur lors de la fin de la partie');
        }
    }

    /**
     * Start a new game.
     * @param {number} id - The game ID.
     */
    async startGame(id, difficulty, collectionName) {
        this.#id = id;
        this.#difficulty = difficulty;
        this.#collection = collectionName;
        this.#nombreCoupsRestant = parseInt(difficulty);
        this.#cartesRetournees = [];
        this.#verrouillage = false;

        // Préparation des images et mélange
        const Images = imageCollections[collectionName].slice(0, this.#nombreCoupsRestant);
        let gameImages = [...Images, ...Images];
        gameImages.sort(() => Math.random() - 0.5);
        this.#domManager.createCards(gameImages);

        // Effet de coup d'œil au début
        this.#isProcessing = true;
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flip'));
        await new Promise(resolve => setTimeout(resolve, 300));
        allCards.forEach(card => card.classList.remove('flip'));
        await new Promise(resolve => setTimeout(resolve, 500));

        this.setupAbandonButton();
        this.#startTimer();
        this.#setupListeners();
        this.#isProcessing = false;
    }

    // Gère le compte à rebours de la partie
    #startTimer() {
        const timerDisplay = document.querySelector('#game-timer');
        this.#tempsRestant = 30;
        if (timerDisplay)
            timerDisplay.textContent = this.#tempsRestant;
        if (this.#timerInterval) clearInterval(this.#timerInterval);

        this.#timerInterval = setInterval(() => {
            this.#tempsRestant--;
            if (timerDisplay) {
                timerDisplay.textContent = this.#tempsRestant;
            }
            if (this.#tempsRestant <= 0) {
                clearInterval(this.#timerInterval);
                this.#playSound('timeout');
                this.showGameOver(false, false);
            }
        }, 1000);
    }

    // Ajoute les écouteurs d'événements sur toutes les cartes
    #setupListeners() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.#handleFlip(card));
        });

    }

    // Gère le retournement d'une carte
    #handleFlip(card) {
        this.#playSound('flip');

        if (this.#verrouillage || card.classList.contains('flip')) return;

        card.classList.add('flip');
        this.#cartesRetournees.push(card);

        if (this.#cartesRetournees.length === 2) {
            setTimeout(() => {
                this.#checkCard();
            }, 500);
        }
    }

    // Vérifie si les deux cartes retournées forment une paire
    #checkCard() {
        this.#verrouillage = true;
        const [card1, card2] = this.#cartesRetournees;
        const isMatch = card1.dataset.id === card2.dataset.id;

        if (isMatch) {
            this.#nombreCoupsRestant--;
            this.#cartesRetournees = [];
            this.#verrouillage = false;
            this.#playSound('match');

            if (this.#nombreCoupsRestant === 0) {
                this.showGameOver(true, false);
                this.#playSound('win');
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                this.#cartesRetournees = [];
                this.#verrouillage = false;
            }, 1000);
        }
    }
}

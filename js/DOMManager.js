export class DOMManager {
    // Génère et affiche le formulaire de configuration initiale dans le DOM
    renderSetupForm(containerSelector, onSubmitCallback) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const form = document.createElement('form');
        form.className = 'game-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="pseudo">Nom du joueur :</label>
                <input type="text" id="pseudo" required placeholder="Ex : Anne">
            </div>
            <div class="form-group">
                <label for="difficulty">Niveau de difficulté :</label>
                <select id="difficulty">
                    <option value="4 paires">4 paires</option>
                    <option value="5 paires">5 paires</option>
                    <option value="6 paires">6 paires</option>
                    <option value="8 paires">8 paires</option>
                </select>
            </div>
            <div class="form-group">
                <label for="collection">Collection d'images :</label>
                <select id="collection">
                    <option value="animals">Animaux</option>
                    <option value="cakes">Patisseries</option>
                    <option value="cars">Voitures</option>
                    <option value="fruits">Fruits</option>
                </select>
            </div>
            <button type="submit">Jouer</button>  
        `;
        container.appendChild(form);
        form.addEventListener('submit', onSubmitCallback);
    }

    // Masque le formulaire de configuration initial
    hideForm() {
        const formPanel = document.querySelector('.setup-form');
        if (formPanel) formPanel.classList.add('hidden');
    }

    // Affiche l'espace de jeu et la barre d'informations
    showGamePanel(pseudo,idPartie, difficulty) {
        const gameArea = document.querySelector('.game-area');
        if (gameArea) gameArea.classList.remove('hidden');

        gameArea.innerHTML = `
            <div class="game-area-header">
                <h2 class="game-info-line">
                    <span>ID : ${idPartie}</span> |    
                    <span>Niveau : ${difficulty}</span> | 
                    <span>Temps restant :️ <span id="game-timer">30</span>s</span> 
                    <button id="abandon">Abandonner</button>
                </h2>
            </div>
        
            <div class="game-board"></div>    
        `;
    }

    /**
     * Ajoute toutes les images d'une collection sur le gameBoard
     * @param {Image[]} images
     */
    createCards(images) {
        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = '';

        images.forEach((image) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = image.id;
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="./assets/images/mask1.jpg" alt="Hidden card">
                    </div>
                    <div class="card-back">
                        <img src="${image.url}" alt="${image.name}">
                    </div>
                </div>
            `;
            gameBoard.appendChild(card);
        });
    }
}
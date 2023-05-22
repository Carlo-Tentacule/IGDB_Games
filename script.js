
//Envoie et retour de la recherche de l'input
function searchGames() {
    var searchGame = document.getElementById('searchInput').value;

    //requete POST vers request.php -> valeur de la recherche
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'searchGame=' + encodeURIComponent(searchGame)
    };

    //demande et récuperation du resultat de la requete
    fetch('request.php', requestOptions)
        .then(response => { return response.json(); })
        .then(data => { displayGame(data); })
        .catch(error => {
            console.error('Erreur :', error);
        });
}


//Affichage des jeux
function displayGame(results) {
    // Initialisation du processus
    var resultsDiv = document.getElementById('listGames');
    resultsDiv.innerHTML = '';

    //msg si aucun resultats dispo
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; height: 30vh;"><h1>Aucun Jeu Disponible</h1><iframe src="https://giphy.com/embed/3oriff4xQ7Oq2TIgTu" width="400" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p></div>';
    } else {
        // Boucle d'affichage
        for (var i = 0; i < results.length; i++) {

            var game = results[i];
            var gameTitle = game.name;
            var gameCover = game.cover;

            let gameDiv = document.createElement('div');
            gameDiv.classList.add('games')

            // Traitement de la cover
            if (gameCover) {
                var coverImage = document.createElement('img');
                coverImage.src = 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + gameCover.image_id + '.jpg';
                gameDiv.appendChild(coverImage);
            } else {
                let noCoverImage = document.createElement('img');
                noCoverImage.src = 'No-Image-Placeholder.png';
                gameDiv.appendChild(noCoverImage);
            }

            // Traitement du titre
            var titleElement = document.createElement('h2');
            titleElement.textContent = gameTitle;
            gameDiv.appendChild(titleElement);

            resultsDiv.appendChild(gameDiv);
        }
    }
}

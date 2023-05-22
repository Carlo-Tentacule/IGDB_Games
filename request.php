<?php
// Récupérez le jeu recherché envoyé depuis script.js
$searchTerm = $_POST['searchGame'];

// URL de l'api
$url = 'https://api.igdb.com/v4/games';

// Configuration des données 
$data = 'search "' . $searchTerm . '"; fields *, cover.*; limit 3;';

// Requête cURL
$request = curl_init();
curl_setopt($request, CURLOPT_URL, $url);
curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
curl_setopt($request, CURLOPT_HTTPHEADER, [
    'Client-ID: dpqhnl8vygtjc3gyg2ec1k0wo1xh7e',
    'Authorization: Bearer 662ztexjdeos4ervdul9zkj6whd0nl',
    'Content-Type: text/plain',
]);
curl_setopt($request, CURLOPT_POST, true);
curl_setopt($request, CURLOPT_POSTFIELDS, $data);

// Envoyez la requête à l'API IGDB
$response = curl_exec($request);

// Vérification des erreurs 
if ($response === false) {
    echo 'Erreur curl : ' . curl_error($request);
}

// Cloturer la connexion cURL
curl_close($request);

// Envoie de la réponse JSON à script.js
header('Content-Type: application/json');
echo $response;

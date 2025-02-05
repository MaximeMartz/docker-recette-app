<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../src/RecipeController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

switch ($requestMethod) {
    case 'GET':
        // Récupérer le paramètre 'id' dans la requête GET
        $id = isset($_GET['id']) ? $_GET['id'] : null;

        if ($id) {
            // Si 'id' est présent, appeler getRecipe avec cet ID
            RecipeController::getRecipe($id);
        } else {
            // Sinon, appeler getAllRecipes pour lister toutes les recettes
            RecipeController::getAllRecipes();
        }
        break;
    case 'POST':
        RecipeController::createRecipe();
        break;
    case 'PUT':
        // Récupérer l'id via le query parameter pour PUT
        $id = isset($_GET['id']) ? $_GET['id'] : null;

        if ($id) {
            // Si l'ID est présent, appeler la fonction updateRecipe avec l'ID
            RecipeController::updateRecipe($id);
        } else {
            // Si aucun ID n'est fourni, retourner une erreur (Bad Request)
            http_response_code(400);
            echo json_encode(['error' => 'ID is required for update']);
        }
        break;
    case 'DELETE':
        // Récupérer l'id via le query parameter pour DELETE
        $id = isset($_GET['id']) ? $_GET['id'] : null;

        if ($id) {
            // Si l'ID est présent, appeler la fonction deleteRecipe avec l'ID
            RecipeController::deleteRecipe($id);
        } else {
            // Si aucun ID n'est fourni, retourner une erreur (Bad Request)
            http_response_code(400);
            echo json_encode(['error' => 'ID is required for delete']);
        }
        break;
    default:
        http_response_code(405);  // Méthode non autorisée
}

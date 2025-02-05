<?php
require_once __DIR__ . '/Database.php';

class RecipeController {
    public static function getAllRecipes() {
        $pdo = Database::connect();
        $stmt = $pdo->query("SELECT * FROM recipes ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function getRecipe($id) {
        $pdo = Database::connect();
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public static function createRecipe() {
        $pdo = Database::connect();
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name'], $data['ingredients'], $data['instructions'])) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides"]);
            return;
        }

        $stmt = $pdo->prepare("INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['ingredients'], $data['instructions']]);

        echo json_encode(["message" => "Recette ajoutée"]);
    }

    public static function updateRecipe($id) {
        $pdo = Database::connect();
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name'], $data['ingredients'], $data['instructions'])) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides"]);
            return;
        }

        $stmt = $pdo->prepare("UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['ingredients'], $data['instructions'], $id]);

        echo json_encode(["message" => "Recette mise à jour"]);
    }

    public static function deleteRecipe($id) {
        $pdo = Database::connect();
        $stmt = $pdo->prepare("DELETE FROM recipes WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(["message" => "Recette supprimée"]);
    }
}

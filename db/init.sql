CREATE DATABASE IF NOT EXISTS recipes_db;

USE recipes_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES 
('admin', 'adminpassword'),
('user1', 'userpassword');

INSERT INTO recipes (name, ingredients, instructions) VALUES
('Pizza Margherita', 
 'Farine, Eau, Levure, Tomates, Mozzarella, Basilic, Huile d\'olive, Sel',
 '1. Mélanger la farine, l\'eau et la levure. Laisser reposer.\n2. Étaler la pâte et ajouter les ingrédients.\n3. Cuire au four à 220°C pendant 10 minutes.'),

('Pâtes Carbonara', 
 'Pâtes, Œufs, Parmesan, Pancetta, Poivre, Sel',
 '1. Faire cuire les pâtes.\n2. Mélanger les œufs et le parmesan.\n3. Faire revenir la pancetta et ajouter aux pâtes avec la sauce.'),

('Salade César', 
 'Laitue romaine, Poulet grillé, Croûtons, Parmesan, Sauce César',
 '1. Laver et couper la laitue.\n2. Ajouter le poulet grillé et les croûtons.\n3. Verser la sauce César et saupoudrer de parmesan.'),

('Bœuf Bourguignon', 
 'Bœuf, Vin rouge, Carottes, Oignons, Lardons, Ail, Bouillon, Thym',
 '1. Faire revenir les lardons et les oignons.\n2. Ajouter la viande et la faire dorer.\n3. Verser le vin rouge et laisser mijoter 3 heures.'),

('Tarte aux pommes', 
 'Pommes, Pâte feuilletée, Sucre, Beurre, Cannelle',
 '1. Préchauffer le four à 180°C.\n2. Étaler la pâte et ajouter les pommes coupées.\n3. Saupoudrer de sucre et de cannelle, puis enfourner 30 minutes.');
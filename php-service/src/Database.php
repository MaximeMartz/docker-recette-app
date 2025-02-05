<?php
require_once __DIR__ . '/../config/config.php';

class Database {
    public static function connect() {
        global $pdo;
        return $pdo;
    }
}

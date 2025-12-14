<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host         = 'localhost';
$port         = '5432';
$bd           = 'registro_clientes_db';
$usuario      = 'postgres';
$contrasena   = 'admin123';
$nombre_tabla = 'clientes';

try {
   $dsn = "pgsql:host=$host;port=$port;dbname=$bd";

   $conexion = new PDO($dsn, $usuario, $contrasena, [
      PDO::ATTR_ERRMODE =>  PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
   ]);
} catch (PDOException $e) {
   http_response_code(500);
   echo json_encode([
      'success' => false,
      'message' => 'Error al Conectar la Base de Datos de PostgreSQL a la Api de PHP: ' . $e->getMessage()
   ], JSON_UNESCAPED_UNICODE);
   exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

/*
CREATE TABLE clientes(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(12) NOT NULL,
	apellido_paterno VARCHAR(12) NOT NULL,
	apellido_materno VARCHAR(12) NOT NULL,
	email VARCHAR(30) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	direccion VARCHAR(120) NOT NULL,
	producto VARCHAR(50) NOT NULL,
	fecha DATE NOT NULL DEFAULT CURRENT_DATE
);
*/
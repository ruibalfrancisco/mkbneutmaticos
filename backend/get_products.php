<?php
/**
 * Script PHP base para la lectura de Neumáticos.
 * React usará este archivo mediante peticiones fetch().
 */

// 1. Permisos de CORS: Vitales para poder llamar desde local (Vite: http://localhost:5173) 
//    hacia tu servidor (Apache/Nginx) sin que el navegador bloquee la lectura.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// --- 2. CONFIGURACIÓN DE TU BASE DE DATOS MYSQL ---
$host = "localhost";        // Tu host (en producción puede seguir siendo localhost)
$db_name = "c1501389_MKB_BD"; // Reemplaza por tu nombre real de base de datos
$username = "c1501389_MKB_BD";         // Reemplaza por tu usuario
$password = "Nevermind55";             // Reemplaza por tu contraseña

try {
    // 3. Conexión usando PDO (Seguro contra inyecciones SQL - Altamente Recomendado)
    $dsn = "mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8";
    $conexion = new PDO($dsn, $username, $password);
    
    // Configurar PDO para que lance excepciones detalladas si hay un error en las consultas.
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 4. Ejecutar la consulta SQL 
    // Asegúrate de cambiar 'productos' por el nombre de tu tabla real.
    // Tu tabla debe tener columnas como: id, name, brand, category, price, image, etc.
    $sql = "SELECT * FROM productos"; 
    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    $productos = array();

    // 5. Formatear la data fila por fila y añadirla al array de respuesta
    while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // (Opcional) Si quieres parsear de string a número algunos campos antes de mandarlo a React:
        // $fila['price'] = (float) $fila['price'];
        // $fila['stock'] = (int) $fila['stock'];
        
        array_push($productos, $fila);
    }

    // 6. Retornar los productos a React en formato JSON legible.
    echo json_encode($productos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
} catch(PDOException $exception) {
    // 7. Si falla la conexión a BD o existe un error de código, el catch lo captura.
    // Mandamos un código 500 para que el frontend React se entere y pinte un letrero de alerta rojo.
    http_response_code(500); 
    echo json_encode(array(
        "error" => true,
        "mensaje" => "Error de conexión o lectura: " . $exception->getMessage()
    ));
}
?>

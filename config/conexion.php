<?php
    session_start();

    class Conectar{
        protected $dbh;

        protected function Conexion(){
            try {
                //Local
				/* $conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=bd1","root",""); */ 
                $conectar = $this->dbh = new PDO("mysql:local=192.168.1.196;dbname=bd1","administrador","Invertek24_");
 
				return $conectar;
			} catch (Exception $e) {
				print "¡Error BD!: " . $e->getMessage() . "<br/>";
				die();
			}
        }

        public function set_names(){
			return $this->dbh->query("SET NAMES 'utf8'");
        }

        public static function ruta(){
            //Local
            return "http://192.168.1.196/";

		}

    }

    // Establecer encabezados CORS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With");

    // Crear una instancia de la clase Conectar
    $conexion = new Conectar();
    // Realizar la conexión a la base de datos
    // Establecer la codificación de caracteres
    $conexion->set_names();
?>

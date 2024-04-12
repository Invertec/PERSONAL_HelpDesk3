<?php
    session_start();

    class Conectar{
        protected $dbh;

        protected function Conexion(){
            try {
                //Local
				/* $conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=bd1","root",""); */  
                $conectar = $this->dbh = new PDO("mysql:host=192.168.1.170;dbname=bd1","administrador","Invertek24_"); 
 
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
            return "http://helpdesk.invertec.cl:80/";

		}

    }
?>

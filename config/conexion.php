<?php
    session_start();

    class Conectar{
        protected $dbh;

        protected function Conexion(){
            try {
                //Local
				$conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=bd1","root",""); 
                /*$conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=bd3","administrador","Invertek24_");*/
 
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
            return "http://localhost:80/PERSONAL_HelpDesk3/";

		}

    }
?>
<?php
    class Estado extends Conectar{

        /* TODO:Todos los registros */
        public function get_estado(){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM tm_estado WHERE est=1;";
            $sql=$conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }

        /* TODO:Insert */
        public function insert_estado($est_nom){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="INSERT INTO tm_estado (est_id, est_nom, est) VALUES (NULL,?,'1');";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $est_nom);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }

        /* TODO:Update */
        public function update_estado($est_id,$est_nom){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="UPDATE tm_estado set
                est_nom = ?
                WHERE
                est_id = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $est_nom);
            $sql->bindValue(2, $est_id);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }

        /* TODO:Delete */
        public function delete_estado($est_id){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="UPDATE tm_estado SET
                est = 0
                WHERE 
                est_id = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $est_id);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }

        /* TODO:Registro x id */
        public function get_estado_x_id($est_id){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM tm_estado WHERE est_id = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $est_id);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }

    }
?>
<?php
    require_once("../config/conexion.php");
    require_once("../models/Estado.php");
    $estado = new Estado();

    switch($_GET["op"]){

        case "guardaryeditar":
            if(empty($_POST["est_id"])){       
                $estado->insert_estado($_POST["est_nom"]);     
            }
            else {
                $estado->update_estado($_POST["est_id"],$_POST["est_nom"]);
            }
            break;

        case "listar":
            $datos=$estado->get_estado();
            $data= Array();
            foreach($datos as $row){
                $sub_array = array();
                $sub_array[] = $row["est_nom"];
                $sub_array[] = '<button type="button" onClick="editar('.$row["est_id"].');"  id="'.$row["est_id"].'" class="btn btn-inline btn-warning btn-sm ladda-button"><i class="fa fa-edit"></i></button>';
                $sub_array[] = '<button type="button" onClick="eliminar('.$row["est_id"].');"  id="'.$row["est_id"].'" class="btn btn-inline btn-danger btn-sm ladda-button"><i class="fa fa-trash"></i></button>';
                $data[] = $sub_array;
            }

            $results = array(
                "sEcho"=>1,
                "iTotalRecords"=>count($data),
                "iTotalDisplayRecords"=>count($data),
                "aaData"=>$data);
            echo json_encode($results);
            break;

        case "eliminar":
            $estado->delete_estado($_POST["est_id"]);
            break;

        case "mostrar";
            $datos=$estado->get_estado_x_id($_POST["est_id"]);  
            if(is_array($datos)==true and count($datos)>0){
                foreach($datos as $row)
                {
                    $output["est_id"] = $row["est_id"];
                    $output["est_nom"] = $row["est_nom"];
                }
                echo json_encode($output);
            }
            break;

        case "combo":
            $datos = $estado->get_estado();
            $html="";
            $html.="<option label='Seleccionar'></option>";
            if(is_array($datos)==true and count($datos)>0){
                foreach($datos as $row)
                {
                    $html.= "<option value='".$row['est_id']."'>".$row['est_nom']."</option>";
                }
                echo $html;
            }
        break;
    }
?>
var tabla;
var usu_id =  $('#user_idx').val();
var rol_id =  $('#rol_idx').val();
var emp_id=  $('#emp_idx').val();
console.log(emp_id);
console.log(rol_id);

function init(){
    $("#ticket_form").on("submit",function(e){
        guardar(e);	
    });

    $("#ticket_prio").on("submit",function(e){
        guardarprio(e);	
    });

    $("#ticket_est").on("submit",function(e){
        guardarest(e);	
    });

}   
function guardarprio(e){
    e.preventDefault();
	var formData = new FormData($("#ticket_prio")[0]);
    $.ajax({
        url: "../../controller/ticket.php?op=asignar_prio",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){

            console.log(datos);
            swal("Correcto!", "Asignado Correctamente", "success");
            $("#modalprioridad").modal('hide');
            $('#ticket_data').DataTable().ajax.reload();
        }
    });
}

function guardarest(e){
    e.preventDefault();
	var formData = new FormData($("#ticket_est")[0]);
    $.ajax({
        url: "../../controller/ticket.php?op=asignar_est",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){

            console.log(datos);
            swal("Correcto!", "Asignado Correctamente", "success");
            $("#modalestado").modal('hide');
            $('#ticket_data').DataTable().ajax.reload();
        }
    });
}



$(document).ready(function(){

    $.post("../../controller/categoria.php?op=combo",function(data, status){
        $('#cat_id').html(data);
    });
    $.post("../../controller/prioridad.php?op=combo",function(data, status){
        $('#prio_id').html(data);
    });
    $.post("../../controller/prioridad.php?op=combo",function(data, status){
        $('#prio_id1').html(data);
    });
    $.post("../../controller/prioridad.php?op=combo",function(data, status){
        $('#prio_nom').html(data);
    });
    $.post("../../controller/estado.php?op=combo",function(data, status){
        $('#est_id').html(data);
    });
    $.post("../../controller/estado.php?op=combo",function(data, status){
        $('#tick_estado').html(data);
    }); 
    $.post("../../controller/usuario.php?op=combo", function (data) {
        $('#usu_asig').html(data);
    });
    
    /* TODO: rol si es 1 entonces es usuario */
    if (rol_id==1){
        $('#viewuser').hide();
        $('#viewadmin').hide();

        tabla=$('#ticket_data').dataTable({
            "aProcessing": true,
            "aServerSide": true,
            dom: 'Bfrtip',
            "searching": true,
            lengthChange: false,
            colReorder: true,
            buttons: [		          
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                    ],
            "ajax":{
                url: '../../controller/ticket.php?op=listar_x_usu',
                type : "post",
                dataType : "json",	
                data:{ usu_id : usu_id },					
                error: function(e){
                    console.log(e.responseText);	
                }
            },
            /* "ordering": false, */
            "bDestroy": true,
            "responsive": true,
            "bInfo":true,
            "iDisplayLength": 10,
            "autoWidth": false,
            "language": {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }     
        }).DataTable(); 
    }else if (rol_id == 2) {
        $('#viewadmin').hide();
    var tick_titulo = $('#tick_titulo').val();
    var cat_id = $('#cat_id').val();
    var prio_id = $('#prio_id').val();
    var est_id = $('#est_id').val();
    listardatatable(tick_titulo,cat_id,prio_id,est_id);
    }else if(rol_id==3){
        
        var emp_id=  $('#emp_idx').val();
        if(emp_id== 1){
            $('#viewuser').hide();
            var tick_titulo = $('#tick_titulo1').val();
            var cat_id = $('#cat_id').val();
            var prio_id = $('#prio_id1').val();
            listardatatableTNO(tick_titulo,prio_id);
        }else{
            $('#viewuser').hide();
            var tick_titulo = $('#tick_titulo1').val();
            var cat_id = $('#cat_id').val();
            var prio_id = $('#prio_id1').val();
            listardatatablecomp(tick_titulo,prio_id);

        }
    }
}
);

function ver(tick_id){
    window.open('http://192.168.1.196:80/view/DetalleTicket/?ID='+ tick_id +'');
}

function asignar(tick_id){
    $.post("../../controller/ticket.php?op=mostrar", {tick_id : tick_id}, function (data) {
        data = JSON.parse(data);
        $('#tick_id').val(data.tick_id);
        
        $('#mdltitulo').html('Asignar Agente');
        $("#modalasignar").modal('show');
    });
}
function prioridad(tick_id){
    $.post("../../controller/ticket.php?op=mostrar", {tick_id : tick_id}, function (data) {
        data = JSON.parse(data); 
        $('#tickx_idx').val(data.tick_id);

        $('#mdltitulo').html('Asignar Prioridad');
        $("#modalprioridad").modal('show');
    });
}
function estado(tick_id){
    $.post("../../controller/ticket.php?op=mostrar", {tick_id : tick_id}, function (data) {
        data = JSON.parse(data); 
        $('#ticke_ide').val(data.tick_id);

        $('#mdltitulo').html('Asignar Estado'); 
        $("#modalestado").modal('show');
    });
}

function guardar(e){
    e.preventDefault();
	var formData = new FormData($("#ticket_form")[0]);
    $.ajax({
        url: "../../controller/ticket.php?op=asignar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            var tick_id = $('#tick_id').val();
            $.post("../../controller/email.php?op=ticket_asignado", {tick_id : tick_id}, function (data) {

            });

            swal("Correcto!", "Asignado Correctamente", "success");

            $("#modalasignar").modal('hide');
            $('#ticket_data').DataTable().ajax.reload();
        }
    });
}

/* function CambiarEstado(tick_id){
    swal({
        title: "HelpDesk",
        text: "Esta seguro de Reabrir el Ticket?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-warning",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function(isConfirm) {
        if (isConfirm) {
            $.post("../../controller/ticket.php?op=reabrir", {tick_id : tick_id,usu_id : usu_id}, function (data) {

            });

            $('#ticket_data').DataTable().ajax.reload();	

            swal({
                title: "HelpDesk!",
                text: "Ticket Abierto.",
                type: "success",
                confirmButtonClass: "btn-success"
            });
        }
    });
} */

$(document).on("click","#btnfiltrar", function(){
    if(rol_id==2)
    { limpiar(); 

        var tick_titulo = $('#tick_titulo').val();
        var cat_id = $('#cat_id').val();
        var prio_id = $('#prio_id').val();
    
        listardatatable(tick_titulo,cat_id,prio_id);

    }else if(rol_id==3){
        if(emp_id==1){
            limpiar(); 

        var tick_titulo = $('#tick_titulo1').val();

        var prio_id = $('#prio_id1').val();
    
        listardatatableTNO(tick_titulo,prio_id);

        }
        else{
            limpiar(); 

            var tick_titulo = $('#tick_titulo1').val();
    
            var prio_id = $('#prio_id1').val();
        
            listardatatablecomp(tick_titulo,prio_id);
        }
    }
    

}); 

$(document).on("click","#btntodo", function(){
   if(rol_id==2){
    limpiar();

    $('#tick_titulo').val('');
    $('#cat_id').val('').trigger('change');
    $('#prio_id').val('').trigger('change');

    listardatatable('','','');
   }else if(rol_id==3){
        if(emp_id==1){
            limpiar();

    $('#tick_titulo').val('');
    $('#prio_id').val('').trigger('change');

    listardatatableTNO('','');
        }else{
            limpiar();

            $('#tick_titulo').val('');
            $('#prio_id').val('').trigger('change');
        
            listardatatablecomp('','');
        }
   } 
});

function listardatatable(tick_titulo, cat_id, prio_id, est_id) {
    tabla = $('#ticket_data').DataTable({
        "processing": true,
        "serverSide": true,
        dom: 'Bfrtip',
        "searching": true,
        lengthChange: false,
        colReorder: true,
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
        "ajax": {
            url: 'controller/ticket.php?op=listar_filtro',
            type: "post",
            dataType: "json",
            data: {
                tick_titulo: tick_titulo,
                cat_id: cat_id,
                prio_id: prio_id,
                est_id: est_id
            },
            error: function (e) {
                console.log(e.responseText);
            }
        },
        "destroy": true,
        "responsive": true,
        "info": true,
        "pageLength": 10,
        "autoWidth": false,
        "language": {
            "processing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningún dato disponible en esta tabla",
            "info": "Mostrando un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "infoPostFix": "",
            "search": "Buscar:",
            "url": "",
            "thousands": ",",
            "loadingRecords": "Cargando...",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}


function listardatatablecomp(tick_titulo,prio_id){
    tabla=$('#ticket_data').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        "searching": true,
        lengthChange: false,
        colReorder: true,
        buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
                ],
        "ajax":{
            url: '../../controller/ticket.php?op=listar_compras',
            type : "post",
            dataType : "json",
            data:{ tick_titulo:tick_titulo,prio_id:prio_id},
            error: function(e){
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,
        "autoWidth": false,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }     
    }).DataTable().ajax.reload();
}

function listardatatableTNO(tick_titulo,prio_id){
    tabla=$('#ticket_data').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        "searching": true,
        lengthChange: false,
        colReorder: true,
        buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
                ],
        "ajax":{
            url: '../../controller/ticket.php?op=listar_TNO',
            type : "post",
            dataType : "json",
            data:{ tick_titulo:tick_titulo,prio_id:prio_id},
            error: function(e){
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,
        "autoWidth": false,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }     
    }).DataTable().ajax.reload();
}

function limpiar(){
    $('#table').html(
        "<table id='ticket_data' class='table table-bordered table-striped table-vcenter js-dataTable-full'>"+
            "<thead>"+
                "<tr>"+
                    "<th style='width: 5%;'>Nro.Ticket</th>"+
                    "<th style='width: 15%;'>Categoria</th>"+
                    "<th class='d-none d-sm-table-cell' style='width: 30%;'>Titulo</th>"+
                    "<th class='d-none d-sm-table-cell' style='width: 5%;'>Prioridad</th>"+
                    "<th class='d-none d-sm-table-cell' style='width: 10%;'>Fecha Creación</th>"+
                    "<th class='d-none d-sm-table-cell' style='width: 10%;'>Fecha Asignación</th>"+
                    /* "<th class='d-none d-sm-table-cell' style='width: 10%;'>Fecha Cierre</th>"+ */
                    "<th class='d-none d-sm-table-cell' style='width: 10%;'>Soporte</th>"+
                    "<th class='d-none d-sm-table-cell' style='width: 5%;'>Estado</th>"+
                    "<th class='text-center' style='width: 5%;'></th>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+

            "</tbody>"+
        "</table>"
    );
}

init();
<div id="modalprioridad" class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
                    <i class="font-icon-close-2"></i>
                </button>
                <h4 class="modal-title" id="mdltitulo"></h4>
            </div>
            <form method="post" id="ticket_prio">
                <div class="modal-body">
                    <input type="hidden" id="tickx_idx" name="tickx_idx">

                    <div class="form-group">
                        <label class="form-label" for="prio_nom">Prioridad</label>
                        <select class="select2" id="prio_nom" name="prio_nom" data-placeholder="Seleccionar" required>

                        </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-rounded btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="submit" name="action" id="#" value="add" class="btn btn-rounded btn-primary">Asignar</button>
                </div>
            </form>
        </div>
    </div>
</div>
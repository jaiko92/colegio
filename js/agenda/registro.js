$(document).ready(function(e) {
	buscadorLista($("input[name=sMateria]"),$("select[name=Materia]"));
	buscadorLista($("input[name=sObservaciones]"),$("select[name=Observaciones]"));
	
    $("#fechac").datepicker({altField: "#fecha", maxDate:"0 D",dateFormat: 'dd-mm-yy'});
	$(".registrar").click(function(e) {
		var Fecha=$("#fecha").val();
		var Detalle=$("textarea[name=detalle]").val();
		var Resaltar=$("input[name=importante]").attr("checked");
		var CodObs=$("select[name=Observaciones]").val();
		var CodMateria=$("select[name=Materia]").val();
		Resaltar=Resaltar?1:0;
		$.post("registrarAgenda.php",{'CodCurso':CodCurso,'CodMateria':CodMateria,'CodObs':CodObs,'Fecha':Fecha,'Detalle':Detalle,'Resaltar':Resaltar},resultado);
		$('html, body').animate({scrollTop:$("#respuesta").position().top-200},300);
    });
	$(".terminar").click(function(e) {
		window.location='./?CodCurso='+CodCurso;
    });
	$(".completar").click(function(e) {
        var valor=$(this).attr('rel');
		$("textarea[name=detalle]").val(valor);
    });
	$(".reporteimprimir").click(function(e) {
		e.preventDefault();
		Busqueda=$("#Busqueda").attr("checked")?true:false;
		if(Busqueda){
			var CodMateria=$("select[name=Materia]").val();
			$.post("reporteimprimir.php",{'CodMateria':CodMateria},mostrar);
		}else{
        	$.post("reporteimprimir.php",mostrar);
		}
    });
	$(".reportegeneral").click(function(e) {
       mostrarAgenda(); 
    });
	/*Busqueda Especifica*/
	$("#Busqueda").change(function(e) {
		mostrarAgenda();
    });
	$('select[name=Materia]').change(function(){
		mostrarAgenda();
	});
	/*Fin Busqueda Especifica*/
	mostrarAgenda();
});
function mostrarAgenda(){
	Busqueda=$("#Busqueda").attr("checked")?true:false;
	if(Busqueda){
		var CodMateria=$("select[name=Materia]").val();
		$.post("mostrarAgenda.php",{'CodMateria':CodMateria},mostrar);	
	}else{
		$.post("mostrarAgenda.php",mostrar);	
	}
}
function resultado(data){
	if(data=='OK'){
		mostrarAgenda();
	}else{
		alert(FalloRegistro+" "+Error+": "+data)	
	}
}
function mostrar(data){
	$("#respuesta").html(data);
	recarga();
}
function recarga(){
	//$(document).ready(function(e) {
    	$(".eliminar").click(function(e) {
    	    e.preventDefault();
			var Cod=$(this).attr("rel");
			if(confirm(mensajeg['EliminarRegistro']))
				$.post("eliminaRegistro.php",{'CodAgenda':Cod},resultado);
	    });    
		$(".resaltar").change(function(e) {
			var CodAgenda=$(this).attr("rel");
			if($(this).attr('checked')){
            	$.post("revisado.php",{'CodAgenda':CodAgenda,'Valor':1},resultado);
			}else{
				$.post("revisado.php",{'CodAgenda':CodAgenda,'Valor':0},resultado);
			}
        });
    //});
}
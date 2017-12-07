
var elementoviejo='';
var elementonuevo='';
var movimientos=0;

var segundos=59;
var segundos2='';
var minutos=2;
var temporizador='';

var  cronometro;

cronometro=setInterval(function(){

		if(segundos<10){
			segundos2='0'+segundos;
		}
		else{
			segundos2=segundos;
		}

		if(segundos==0){
			minutos--;
			segundos=0;
			segundos2='0'+segundos;
			temporizador=minutos+':'+segundos2;
			if(minutos==0 && segundos==0){
				detenercronometro();
				
			}
			segundos=59;
		}
		else{
			temporizador=minutos+':'+segundos2;
		}
		
		$("#timer").text(temporizador);

		
		
		segundos--;
	},1000);


$(function(){
	var id2=0;
	LlenarTablero();
    $("span").draggable({
    	helper:'clone',
    	start:function(){
    		id2=$(this).attr("id");
    		elementoviejo=$(this).html();
    		$(this).addClass('elementoVienjo');
    	}
    });

   	$("span").droppable({
   		drop:function(event, ui){
   			id=$(this).attr("id");

   			
   			if(validandomovimiento(id, id2)){
   				elementonuevo=$(this).html();	   			
	   			$(this).html(elementoviejo);
	   			$(".elementoVienjo").html(elementonuevo);
	   			$(".elementoVienjo").removeClass('elementoVienjo');
	   			validandoFilaColuman(elementonuevo,id);
	   			movimientos++;
	   			$("#movimientos-text").text(movimientos);		
			}
   			


   		}
   	});

	$(".main-titulo").animate(500, function(){
		colorBlanco(this);
	})
	

})

function validandomovimiento(id, id2){
	var a=Number(id2)-1;
	var b=Number(id2)+1;
	var c=Number(id2)+7;
	var d=Number(id2)-7;

	console.log(b+'-->'+id);
	if(a==id || b==id || c==id || d==id){

		return true;
	}
	else{return false;}
}

function detenercronometro(){
	clearInterval(cronometro);

	$(".btn-reinicio").text('Reiniciar');

	var anchopanel=$(window).width()-300;
	
	$("img").animate({
					width:"0px"
				},1000,function(){
					$(".panel-tablero").animate({
						width:"0"
					},1000, function(){
						
						$(this).hide();
					})

					$(".panel-score").animate({
						width:anchopanel+'px',
						margin:'auto'
					}, 1000)

				})
}


var puntuacion=0;

function validandoFilaColuman(elemento, id){


	validadDerecha(id);
	validaIzquierda(id);
	validarArriba(id);
	validarAbajo(id)
}



function validadDerecha(id){
	var id=Number(id);
	var elemento1=Number(id)+7;
	var elemento2=Number(id)+14;
	agregarElementos(id, elemento1, elemento2);
	
}

function validaIzquierda(id){
	var id=Number(id);
	var elemento1=Number(id)-7;
	var elemento2=Number(id)-14;
	agregarElementos(id, elemento1, elemento2);

}

function validarArriba(id){
	var id=Number(id);
	var elemento1=Number(id)-1;
	var elemento2=Number(id)-2;
	agregarElementos2(id, elemento1, elemento2);
}

function validarAbajo(id){
	var id=Number(id);
	var elemento1=Number(id)+1;
	var elemento2=Number(id)+2;
	agregarElementos2(id, elemento1, elemento2);
}


function agregarElementos(id, elemento1, elemento2){
	var imgOriginal=$("#"+id+' img').attr('src');
	var imgderecha=$("#"+elemento1+' img').attr('src');
	var imgizqui=$("#"+elemento2+' img').attr('src');

	if(elemento1!==undefined && elemento2!==undefined){
		if(imgOriginal===imgderecha && imgOriginal===imgizqui){		
			puntuacion+=(10*3);
			$("#score-text").text(puntuacion);
			for(i=0; i<=7; i++){
				var sigu1=id-1;
				var sigu2=elemento1-1;
				var sigu3=elemento2-1;
				if($("#"+id).attr("class")!='stop ui-draggable ui-draggable-handle ui-droppable'){
					

					$("#"+id).html($("#"+sigu1).html());
					$("#"+elemento1).html($("#"+sigu2).html());
					$("#"+elemento2).html($("#"+sigu3).html());

					
				}

				else{
					
					$("#"+id).animate(500, function(){
						ficha=Math.floor((Math.random() * 3) + 1);
						$("#"+id).html("<img src='image/"+ficha+".png' height='94'>");
						ficha=Math.floor((Math.random() * 3) + 1);
						$("#"+elemento1).html("<img src='image/"+ficha+".png' height='94'>");
						ficha=Math.floor((Math.random() * 3) + 1);
						$("#"+elemento2).html("<img src='image/"+ficha+".png' height='94'>");

						$("#"+id).hide();
						$("#"+elemento1).hide();
						$("#"+elemento2).hide();

					})
					.animate(
						500, function(){
						$("#"+id).show('slow');
						$("#"+elemento1).show('slow');
						$("#"+elemento2).show('slow');
						});

					break;
				}

				id--;
				elemento1--;
				elemento2--;
			}
		}
	}

}

	
function agregarElementos2(id, elemento1, elemento2){
var id2=id;
var imgOriginal=$("#"+id+' img').attr('src');
var imgarriba=$("#"+elemento1+' img').attr('src');
var imgarriba2=$("#"+elemento2+' img').attr('src');

for(i=1; i<=7; i++){
	if($("#"+id2).attr("class")=='stop ui-draggable ui-draggable-handle ui-droppable'){
			final=id2;
			break;
		}
	id2--;
	}

if(imgOriginal==imgarriba && imgOriginal==imgarriba2 && id!=final){
	puntuacion+=(10*3);
	$("#score-text").text(puntuacion);

	for(i=1; i<=7; i++){
		if((id-3)>=final){
			sigu1=id-3;
			$("#"+id).html($("#"+sigu1).html());
			id-=3
			
		}else{			
				aimarvertical(id);
				aimarvertical(elemento1);
				aimarvertical(elemento2);
				aimarvertical(final);
			break;
		}

		if((elemento1-3)>final){
			sigu2=elemento1-3;
			$("#"+elemento1).html($("#"+sigu2).html());
			elemento1-=3;
			
		}else{

			aimarvertical(elemento1);
			aimarvertical(elemento2);
			aimarvertical(final);	
			break;}

		if((elemento2-3)>final){
			sigu3=elemento2-3;
			$("#"+elemento2).html($("#"+sigu3).html());
			elemento2-=3;
		}else{
			aimarvertical(id);
			aimarvertical(elemento1);
			aimarvertical(final);
			
			break;}
		}
	}
}


function aimarvertical(elemento){
	$("#"+elemento).animate(500, function(){
				ficha=Math.floor((Math.random() * 3) + 1);
				$("#"+elemento).html("<img src='image/"+ficha+".png' height='94'>");
				$("#"+elemento).hide();
			}).animate(500, function(){
				$("#"+elemento).show('slow');
			});
}

function colorBlanco(elemento){
	$(elemento).animate({
		color: 'yellow'
	},500, function(){		
		colorAmarillo($(elemento));
	})
}

function colorAmarillo(elemento){
	$(elemento).animate({
		color:'white'
	},500, function(){
		$(elemento).removeClass('blanco');
	$(elemento).addClass('amarillo',500);
	colorBlanco($(elemento));
	})
	
}



function LlenarTablero(){
	columna($(".col-1"));
	columna($(".col-2"));
	columna($(".col-3"));
	columna($(".col-4"));
	columna($(".col-5"));
	columna($(".col-6"));
	columna($(".col-7"));	
}
var id=0;


function columna(Elemento){
	var ficha=0;
	 var html='';

	for(i=1; i<=7; i++){
		 ficha=Math.floor((Math.random() * 3) + 1);
		 if((id%7)==0){
		 	html+="<span id='"+id+"' class='stop'><img  src='image/"+ficha+".png' height='94'></span>";
		 }
		 else{
		 	html+="<span id='"+id+"'><img  src='image/"+ficha+".png' height='94'></span>";
		 }
		 
		 id++;
	}
	
	$(Elemento).html(html);
}
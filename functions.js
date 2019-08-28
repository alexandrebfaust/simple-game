/*
Up - 38
Down - 40
Left - 37
Right - 39
*/
/*SEMPRE TRABALHAR COM MÚLTIPLOS DE 2*/
var posicaomapa = 0;
var posicaoplataforma = 0;
var posicaomapamin = 120;
var posicaomapamax = -3000;
var posicaoplataformamin = 600;
var posicaoplataformamax = -15000;
var posicaopersonagem = 0;
var tamanhopersonagem = 80;
var margempersonagem = 100;
var xpersonagem = tamanhopersonagem+margempersonagem;
var acaopersonagem = 'idle';
var direcaopersonagem = 'direita';
var moedas = 0;
var chaveouro = 0;
var chaveprata = 0;
var posicaobarreira = 0;



/*BARREIRAS*/
function localizarbarreira(){
	if($(".barrier")){
		posicaobarreira = $(".barrier").css("left");
		//console.log(posicaobarreira);
		posicaobarreira = posicaobarreira.replace("px", "");
		posicaobarreira = (posicaobarreira*(-1)+120);
	}
}

localizarbarreira();

/*ABRIR BARREIRA*/
$(".barrier").click(function() {
	if(moedas >= 1){
		console.log('abriu');
		$(this).remove();
		moedas -= 1;
		$("#coins").html(moedas);
		localizarbarreira();
  }
});

/*PEGAR MOEDA*/
$(".item").click(function() {
console.log('pegou');
  $(this).remove();
  moedas += 1;
  $("#coins").html(moedas);
});

/*PEGAR CHAVE OURO*/ 
$(".keyg").click(function() {
	//console.log('pegou');
  $(this).remove();
  chaveouro += 1;
  $("#keysg").html(chaveouro);
});

/*PEGAR CHAVE PRATA*/
$(".keys").click(function() {
	//console.log('pegou');
  $(this).remove();
  chaveprata += 1;
  $("#keyss").html(chaveprata);
});

function movermapa(direcao){
	if(direcao=='esquerda'){
		if (posicaoplataformamin != posicaoplataforma){
			posicaomapa += 2;
			posicaoplataforma += 10;
			$('.map').css('background-position-x', posicaomapa);
			$('.platform').css('background-position-x', posicaoplataforma);
			$('.texts').css('left', posicaoplataforma);
			$('.items').css('left', posicaoplataforma);
		}
		else{
			console.log('Voce nao pode mover para Esquerda');
		}
	}
	if(direcao=='direita'){
		if (posicaoplataformamax != posicaoplataforma){
			if(posicaoplataforma != posicaobarreira){
				posicaomapa -= 2;
				posicaoplataforma -= 10;
				$('.map').css('background-position-x', posicaomapa);
				$('.platform').css('background-position-x', posicaoplataforma);
				$('.texts').css('left', posicaoplataforma);
				$('.items').css('left', posicaoplataforma);
			}
		}
		else{
			console.log('Voce nao pode mover para Direita');
		}
	}
}

function moverpersonagem(direcao){
	if(direcao=='esquerda'){
		$('#char').css('transform', 'scaleX(-1)');
		direcaopersonagem = 'esquerda';
		if(acaopersonagem == 'idle'){
			acaopersonagem = 'run';
			$("#char").attr("src","src/run.gif");
		}
	}
	if(direcao=='direita'){
		$('#char').css('transform', 'scaleX(1)');
		direcaopersonagem = 'direita';
		if(acaopersonagem == 'idle'){
			acaopersonagem = 'run';
			$("#char").attr("src","src/run.gif");
		}
	}
}

function personagematacar(){
	$("#char").attr("src","src/grab.gif");
}


/*CORRENDO SETAS*/
$(document).keydown(function(e) {
	if((e.keyCode || e.which) == 37) { //Esquerda
    	//console.log('Esquerda');
    	movermapa('esquerda');
    	moverpersonagem('esquerda');
    }
    if((e.keyCode || e.which) == 39) { //Direita
    	//console.log('Direita');
    	movermapa('direita');
    	moverpersonagem('direita');
    }
    if((e.keyCode || e.which) == 88) { //Direita
    	console.log('Atacar');
    	personagematacar();
    }
});

/*CORRENDO BOTAO*/
$("#btnesquerda").click(function() {
	console.log('Esquerda');
    	movermapa('esquerda');
    	moverpersonagem('esquerda');
});
$("#btndireita").click(function() {
	console.log('Direita');
    	movermapa('direita');
    	moverpersonagem('direita');
});

/*PARADO*/
$(document).keyup(function(e){
	if(acaopersonagem == 'run'){
		acaopersonagem = 'idle';
		$("#char").attr("src","src/idle.gif");
	}
});

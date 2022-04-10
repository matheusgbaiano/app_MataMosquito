var altura = 0
var largura = 0
var vidas = 1 
var pontos = 0
var pontosFeitos = 0
var tempo = 0

var criarMosquitoTempo = 1500 

var nivel = window.location.search
nivel = nivel.replace("?", "")

if( nivel === "normal"){
    criarMosquitoTempo = 1500
    tempo = 15
} else if (nivel === "dificil"){
    criarMosquitoTempo = 1000
    tempo = 20
} else if (nivel === "deusSupremo"){
    criarMosquitoTempo = 750
    tempo = 30
}

function ajustarTamanhoTela(){
    
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}

ajustarTamanhoTela()

var cronometro = setInterval(function(){
    
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criarMosquito)
        window.location.href = "vitoria.html" + "?" + pontosFeitos
    } else{
        document.getElementById("cronometro").innerHTML = tempo    
    }
    tempo -= 1
}, 1000)

function posicaoRandomica(){

    if(document.getElementById("mosquito")){
        document.getElementById("mosquito").remove()

        if(vidas > 3){
            window.location.href="fim_de_jogo.html" + "?" + pontosFeitos
        } else{
            document.getElementById("v" + vidas).src="imagens/coracao_vazio.png"
            vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

   /*  //operador ternário
    posicaoX = (posicaoX < 0) ? 0 : posicaoX
    posicaoY = (posicaoY < 0) ? 0 : posicaoY
 */

    if(posicaoX < 0){
        posicaoX = 0
    } else{
        posicaoX = posicaoX
    }

    if(posicaoY < 0){
        posicaoY = 0
    } else{
        posicaoY = posicaoY
    }

    //console.log(posicaoX, posicaoY)

    var mosquito = document.createElement("img")
    mosquito.src = "imagens/mosquito.png"
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio()
    mosquito.style.left = posicaoX + "px"
    mosquito.style.top = posicaoY + "px" 
    mosquito.style.position = "absolute"
    mosquito.id = "mosquito"
    mosquito.onclick = function(){
        pontuacaoFeita()
        this.remove()
    }

    document.body.appendChild(mosquito)

    function pontuacaoFeita(){
        pontos++
        document.getElementById("pontos").innerHTML = pontos
        pontosFeitos = pontos
        return pontosFeitos
    }
}

function tamanhoAleatorio(){

    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0: 
            return "mosquito1"
        case 1:
            return "mosquito2"
        case 2:
            return "mosquito3"
    }
}

function ladoAleatorio(){

    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0: 
            return "ladoA"
        case 1:
            return "ladoB"
    } 
}

function recuperarPontos(){
    var pontosRecuperados = window.location.search
    pontosRecuperados = pontosRecuperados.replace("?", "")
    return pontosRecuperados
}
document.getElementById("pontos").innerHTML = recuperarPontos()
let xBolinha = 300
let yBolinha = 200
let raio = 10
let velocidadeXBolinha = 10
let fatorX = +1
let fatorY = -1
let ataque = 3

let tela = document.querySelector('canvas')
let pincel = tela.getContext('2d')
pincel.fillStyle = 'black'
pincel.fillRect(0,0,600,400)

function desenhaBolinha(x,y) {
    pincel.fillStyle = 'white'
    pincel.beginPath()
    pincel.arc(x,y,raio,0,Math.PI*2)
    pincel.fill()
}

function limpaRastroBolinha(x,y){
    pincel.fillStyle = 'black'
    pincel.beginPath()
    pincel.arc(x-1,y,raio+10,0,Math.PI*2)
    pincel.fill()
}

function colide() {
    if (xBolinha >= 600-raio) {
        fatorX = -1
    } else if (xBolinha <= raio) {
        fatorX = +1
    }
    if (yBolinha >= 400-raio) {
        fatorY = -1
    } else if (yBolinha <= raio) {
        fatorY = +1
    }
}

function desenhaRaqueteA(y) {
    pincel.fillStyle = 'white'
    pincel.fillRect (10,y,5,80)
}

// CRIANDO RAQUETE AUTOMATICA B
function desenhaRaqueteB(y) {
    if (y > 100 && y <= 440) {
        pincel.fillStyle = 'black'  // limpar rastro da raquete
        pincel.fillRect(590,0,15,400) // limpar rastro da raquete
        pincel.fillStyle = 'white'
        pincel.fillRect (590,y-(25*ataque),5,80)  // inteligencia artificial
    }
    }

// MOVENDO COM SETAS
var cima = 38;
var baixo = 40;

let yRaqueteA = 10
function leDoTeclado(evento) { 
    if (evento.keyCode == baixo && yRaqueteA <= 300) {
        yRaqueteA=yRaqueteA+30
    } else if (evento.keyCode == cima && yRaqueteA >= 20) {
        yRaqueteA=yRaqueteA-30
    }
    pincel.fillStyle = 'black'  // limpar rastro da raquete
    pincel.fillRect(0,0,15,400) // limpar rastro da raquete
    desenhaRaqueteA(yRaqueteA)
}
document.onkeydown = leDoTeclado
// MOVENDO COM SETAS

// Refresh
setInterval(refresh, velocidadeXBolinha)

function refresh() {
    limpaRastroBolinha(xBolinha,yBolinha)
    desenhaRaqueteA(yRaqueteA)
    desenhaRaqueteB(yBolinha)
    desenhaBolinha(xBolinha,yBolinha)
    colide()
    xBolinha = xBolinha + fatorX * ataque
    yBolinha = yBolinha + fatorY * ataque
    
}
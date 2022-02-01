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
pincel.fillStyle = 'white'
pincel.fillRect(0,400,600,30)

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
let vida = 4
function colide() {
    let colideA = (yBolinha >= yRaqueteA && yBolinha <= yRaqueteA+80 && xBolinha <= 15+raio) ? true : false
    let colideB = true
    if (xBolinha >= 600-raio) {
        fatorX = -1
        if (colideB == false) {
            vida++
            footer.innerHTML = vida+1 // só pra ve o html
            desenhaPixel(vida,'blue')
        }
    } else if (xBolinha <= raio || colideA) {
        fatorX = +1
        if (colideA == false) {
            vida--
            desenhaPixel(vida,'red')
            footer.innerHTML = vida+1 // só pra ve o html
        }
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

// RAQUETE-B AUTOMATICA
function desenhaRaqueteB(y) {
    if (y > 100 && y <= 440) {
        pincel.fillStyle = 'black'  // limpar rastro da raquete
        pincel.fillRect(590,0,15,400) // limpar rastro da raquete
        pincel.fillStyle = 'white'
        pincel.fillRect (590,y-(25*ataque),5,80)  // inteligencia artificial
    }
}
// RAQUETE-B AUTOMATICA

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

// REFRESH
setInterval(refresh, velocidadeXBolinha)

function refresh() {
    limpaRastroBolinha(xBolinha,yBolinha)
    desenhaRaqueteA(yRaqueteA)
    desenhaRaqueteB(yBolinha)
    desenhaBolinha(xBolinha,yBolinha)
    colide()
    pontua()
    xBolinha = xBolinha + fatorX * ataque
    yBolinha = yBolinha + fatorY * ataque
    
}
// REFRESH

// SISTEMA DE PONTOS
function pontua(){
    for (var x = 0; x <= vida; x++) { 
        let cor = 'blue'
        desenhaPixel(x,cor)
    }
    for (var x = vida+1; x < 10; x++) { 
        let cor = 'red'
        desenhaPixel(x,cor)
    } 
}


function desenhaPixel(x,cor) {
    pincel.fillStyle = cor
    pincel.fillStroke = 'black'
    pincel.fillRect(60*x,400,60,40)
    pincel.strokeRect(60*x,400,60,40)
}
// SISTEMA DE PONTOS

var footer = document.querySelector('footer') // só para ver o codigo funcionante

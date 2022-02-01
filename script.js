let xBolinha = 300
let yBolinha = 200
let raio = 10
let velocidadeXBolinha = 10
let fatorX = +1
let fatorY = -1
let ataque = 4

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

function refresh() {
    limpaRastroBolinha(xBolinha,yBolinha)
    desenhaRaqueteA()
    desenhaBolinha(xBolinha,yBolinha)
    colide()
    xBolinha = xBolinha + fatorX * ataque
    yBolinha = yBolinha + fatorY * ataque
    
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




function desenhaRaqueteA() {
    pincel.fillStyle = 'white'
    pincel.fillRect (10,10,5,80)

}
desenhaRaqueteA()

setInterval(refresh, velocidadeXBolinha)
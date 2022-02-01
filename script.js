let xBolinha = 300
let yBolinha = 200
let raio = 10
let velocidadeXBolinha = 10

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
    pincel.arc(x-1,y,raio+5,0,Math.PI*2)
    pincel.fill()
}

function moveBolinha() {
    limpaRastroBolinha(xBolinha,yBolinha)
    desenhaBolinha(xBolinha,yBolinha)

    xBolinha++
    
}

function colisao() {
}

setInterval(moveBolinha, velocidadeXBolinha)
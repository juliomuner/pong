let xBolinha = 300
let yBolinha = 200
let raio = 10
let velocidadeXBolinha = 150
let fatorX = 1
let fatorY = -1
let ataque = 0
let alturaDaColisao = 0
let inicioRaqueteA = 10
let centroRaqueteA = inicioRaqueteA + 40
let fimRaqueteA = inicioRaqueteA + 80
let inicioRaqueteB = 200
let centroRaqueteB = inicioRaqueteB + 40
let fimRaqueteB = inicioRaqueteB + 80

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
    let sinal = (yBolinha > 200) ? 1 : -1
    let distanciaXDoCentro = parseInt(Math.pow(((yBolinha - 200)/40),2)/5)*sinal
    return sinal
}

function limpaRastroBolinha(x,y){
    pincel.fillStyle = 'black'
    pincel.beginPath()
    pincel.arc(x-1,y,raio+10,0,Math.PI*2)
    pincel.fill()
}
let vida = 4
function colisao() {
    let contato = localDaBatida(yBolinha, inicioRaqueteA)
    let colideA = (yBolinha >= inicioRaqueteA && yBolinha <= fimRaqueteA && xBolinha <= 0+15+raio) ? true : false
    let colideB = (yBolinha >= inicioRaqueteB && yBolinha <= fimRaqueteB && xBolinha >= 600-15-raio) ? true : false
    
    
    if (xBolinha >= 600-raio || colideB) {
        fatorX = -1
        if (colideB == false) {
            vida = vida + (vida < 9 ? 1 : 0)
            desenhaPixel(vida,'blue')
        }

    // COLISÃO LADO A
    } else if (xBolinha <= raio || colideA) {
        fatorX = +1 // tanto faz a colisão, altera a o sentido
        ataque = contato // em qualquer colisão muda o angulo de ataque conforme função localDaBatida     
        alturaDaColisao = desenhaBolinha(xBolinha, yBolinha)
        // se a colisão for na casquinha troca o sentido vertical
        if (contato == 5 && yBolinha < centroRaqueteA) {
            fatorY = -1
        } else if (contato == 5 && yBolinha > centroRaqueteA) {
            fatorY = +1
        }

        if (colideA == false) {     // porém se não bater na raquete
            vida = vida + (vida >= 0 ? -1 : 0)
            desenhaPixel(vida,'red')
            ataque = 0
            xBolinha = 40
            yBolinha = 200
            limpaRastroBolinha(xBolinha,yBolinha)
        }
    }

    // COLISÃO COM CHÃO
    if (yBolinha >= 400-raio) {
        fatorY = -1
    } else if (yBolinha <= raio) {
        fatorY = +1
    }
    div1.innerHTML = `<br> colideA ${colideA}<br>`
}

function desenhaRaqueteA(y) {
    pincel.fillStyle = 'black'  // limpar rastro da raquete
    pincel.fillRect(0,0,15,400) // limpar rastro da raquete
    pincel.fillStyle = 'white'
    let y2 = y
    if (y < 10) {
        y2 = 10
    } else if (y > 310) {
        y2 = 310}
    pincel.fillRect (10,y2,5,80)
}

// RAQUETE-B
function desenhaRaqueteB(yBolinha) {
    // y = yBolinha
    pincel.fillStyle = 'black'  // limpar rastro da raquete
    pincel.fillRect(590,0,15,400) // limpar rastro da raquete
    pincel.fillStyle = 'white'

    //inteligencia artificial
    delayBolinha = yBolinha + 12*ataque*alturaDaColisao
        
    // adicionando os limites
    if (delayBolinha < 50) {
        inicioRaqueteB = 10
    } else if (delayBolinha >= 350) {
        inicioRaqueteB = 310
    } else {
        inicioRaqueteB = delayBolinha-40 // para centralizar a bola
    }
    centroRaqueteB = inicioRaqueteB + 40
    fimRaqueteB = inicioRaqueteB + 80
    
    pincel.fillRect (590,inicioRaqueteB,5,80)

}
// RAQUETE-B

//movendo com mouse
function movimentaRaquete(evento) {
    inicioRaqueteA = evento.pageY - tela.offsetTop -40
    centroRaqueteA = inicioRaqueteA + 40
    fimRaqueteA = inicioRaqueteA + 80
    desenhaRaqueteA(inicioRaqueteA)
}
tela.onmousemove = movimentaRaquete

// REFRESH
setInterval(refresh, velocidadeXBolinha)
function refresh() {
    limpaRastroBolinha(xBolinha,yBolinha)
    desenhaRaqueteA(inicioRaqueteA)
    desenhaRaqueteB(yBolinha)
    desenhaBolinha(xBolinha,yBolinha)
    colisao()
    pontua()
    xBolinha = xBolinha + fatorX*5
    yBolinha = yBolinha + fatorY * ataque 
    footer.innerHTML = `xBolinha: ${xBolinha}<br>yBolinha: ${yBolinha}<br>inicioRaqueteA:${inicioRaqueteA}
    <br>ataque: ${ataque}<br> centroRaqueteB: ${centroRaqueteB}<br> Altura da colisão ${alturaDaColisao} e ${desenhaBolinha(xBolinha, yBolinha)}`
    
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


 let localDaBatida = function(x,y) {
    if (x >= y+40 && x <= y+60) {
        local = 2 // centro (y+40 a y+60)
    } else if ((x >= y+10 && x < y+40) || (x > y+60 && x <= y+70)) {
        local = 3 // halo (y+10 a y + 40) (y+40 a y+70)
    } else if ((x >= y && x < y+10) || (x > y+70 && x <= y+80)) {
        local = 5 // canto (y a y+10) (y+70 a y+80)
    } else {
        local = 0 // fora
    }
    return Number(local)
}

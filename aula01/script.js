var canvas, context
var HEIGHT, WIDTH
var circle, square, triangle

var drawCircle = {
    r: 100,
    x: 300,
    y: 300,
    color: '#FFFF00',
    draw: function() {
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.x, this.y, this.r, 0, (Math.PI * 2))
        context.fill()
    }
}
var drawSquare = {
    w: 200,
    h: 200,
    x: 200,
    y: 400,
    color: '#0000FF',
    draw: function(){
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.w, this.h)
    }
}
var drawTriangle = {
    color: '#00FF00',
    draw: function() {
        context.fillStyle = this.color
        context.beginPath()
        context.moveTo(300, 200)
        context.lineTo(200, 400)
        context.lineTo(400, 400)
        context.fill()
    }
}

function execute(){
    drawCircle.draw()
    drawSquare.draw()
    drawTriangle.draw()
}

function main(params) {
    WIDTH = window.innerHeight
    HEIGHT = window.innerWidth

    if(WIDTH >= 500){
        WIDTH = 600
        HEIGHT = 600
    }

    canvas = document.createElement('canvas')

    canvas.width = WIDTH
    canvas.height = HEIGHT

    context = canvas.getContext('2d')

    document.body.appendChild(canvas)

    execute()
}

main()
var canvas, context
var circle, square, triangle
var WIDTH, HEIGHT

var drawCircle = {
    r: 100,
    x: 300,
    y: 300,
    //dir => direction, 0 = right, 1 = left
    dir: 0,
    color: '#FFFF00',
    draw: function() {
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.x, this.y, this.r, 0, (Math.PI * 2))
        context.fill()
    },
    move: function(){
        if((this.x  + 100)  >= WIDTH){
            this.dir = 1
        }
        if((this.x  - 100) <= 0){
            this.dir = 0
        }
        if(this.dir === 0){
            this.x++
        }
        else {
            this.x--
        }
    }
}
var drawSquare = {
    w: 200,
    h: 200,
    x: 200,
    y: 400,
    dir: 1,
    color: '#0000FF',
    draw: function(){
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.w, this.h)
    },
    move: function() {
        if((this.x + this.w)>= WIDTH){
            this.dir = 1
        }
        if(this.x  === 0){
            this.dir = 0
        }
        if(this.dir === 0){
            this.x++
        }
        else{
            this.x--
        }
    }
}
var drawTriangle = {
    x1:300, x2: 200, x3: 400,
    y1:200, y2: 400, y3: 400,
    color: '#00FF00',
    dir: 0,
    draw: function() {
        context.fillStyle = this.color
        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.lineTo(this.x2, this.y2)
        context.lineTo(this.x3, this.y3)
        context.fill()
    },
    move: function() {
        if(this.x3 >= WIDTH){
            this.dir = 1
        }
        if(this.x2 === 0){
            this.dir = 0
        }
        if(this.dir === 0){
            this.x1 += 2
            this.x2 += 2
            this.x3 += 2
        }
        else {
            this.x1 -= 2
            this.x2 -= 2
            this.x3 -= 2
        }
    }

}
function draw(){
    backgroundCanvas()

    drawCircle.draw()
    drawSquare.draw()
    drawTriangle.draw()
}
function update(){
    drawCircle.move()
    drawSquare.move()
    drawTriangle.move()
}
function backgroundCanvas(){
    context.fillStyle = '#FFF'
    context.fillRect(0, 0, WIDTH, HEIGHT)
}
function execute(){
    draw()
    update()

    window.requestAnimationFrame(execute)
}

function main() {
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
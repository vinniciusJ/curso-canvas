var canvas, context
var WIDTH, HEIGHT

var cactus = {
    vector: [],
    time: 0,
    x: 0,
    insert: function(){
        this.vector.push({
            name: './assets/cactus1.gif',
            x: window.innerWidth,
        })

        this.time = 200
    },
    update: function(){
        if(this.time == 0)
            this.insert()
        else
            this.time--
        
        for(let i = 0; i < this.vector.length; i++){
            let v = this.vector[i]
            
            v.x-=3
        }
    },
    draw: function(){
        for(let i = 0; i < this.vector.length; i++){
            let v = this.vector[i]

            let c1 = new Image()
            c1.src = v.name

            context.drawImage(c1, v.x, 30, 100, 150)
        }
    } 
}
var cactusBackground = {
    vector: [],
    time: 0,
    x: 0,
    insert: function(){
        this.vector.push({
            name: './assets/cactus1.gif',
            x: window.innerWidth,
        })

        this.time = 400
    },
    update: function(){
        if(this.time == 0)
            this.insert()
        else
            this.time--
        
        for(let i = 0; i < this.vector.length; i++){
            let v = this.vector[i]
            
            v.x--
        }
    },
    draw: function(){
        for(let i = 0; i < this.vector.length; i++){
            let v = this.vector[i]

            let c1 = new Image()
            c1.src = v.name

            context.drawImage(c1, v.x, 30, 50, 100)
        }
    } 
}
var floor = {
    h: 80,
    x: 0,
    y: 120,
    color: '#2A120A',
    draw: function(){
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, WIDTH, this.h)
    },
}
var ball = {
    r: 20,
    x: 20,
    y: 0,
    color: '#FFF000',
    draw: function(){
        context.beginPath()

        context.fillStyle = this.color
        context.arc(this.x, this.y, this.r, 0, (Math.PI * 2))
        context.fill()
    },
    drop: function(){
        if((this.y + this.r) <= 180)
            this.y += 2
    }
}

function update(){
    cactusBackground.update()
    cactus.update()
    ball.drop()
}
function draw(){
    updateBackgroundCanvas()
    
    floor.draw()
    cactusBackground.draw()
    cactus.draw()

    ball.draw()
}
function execute(){
    draw()
    update()

    window.requestAnimationFrame(execute)
}
function updateBackgroundCanvas(){
    let background = context.createLinearGradient(0, 0, 0, HEIGHT)
    
    background.addColorStop(0, '#070719')
    background.addColorStop(1, '#58D3F7')

    context.fillStyle = background
    context.fillRect(0, 0, WIDTH, HEIGHT)
}
function main(){
    HEIGHT = 200
    WIDTH = window.innerWidth

    canvas = document.createElement('canvas')

    canvas.width = WIDTH
    canvas.height = HEIGHT

    context = canvas.getContext('2d')

    document.body.appendChild(canvas)

    execute()
}
main()
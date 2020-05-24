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
            this.vector[i].x -= 3

            if(this.vector[i].x <= -this.vector[i].w){
                this.vector.splice(i, 1)
            }
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
            w: 50,
            h: 30
        })

        this.time = 400
    },
    update: function(){
        if(this.time == 0)
            this.insert()
        else
            this.time--
        
        for(let i = 0; i < this.vector.length; i++){
            this.vector[i].x--

            if(this.vector[i].x <= -this.vector[i].w){
                this.vector.splice(i, 1)
            }
        }
    },
    draw: function(){
    
        for(let i = 0; i < this.vector.length; i++){
            let c1 = new Image()
            
            c1.src = this.vector[i].name

            context.drawImage(c1, this.vector[i].x, this.vector[i].h, this.vector[i].w, 100)
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
    status: false,        // a bola esta no ar
    draw: function(){
        context.beginPath()

        context.fillStyle = this.color
        context.arc(this.x, this.y, this.r, 0, (Math.PI * 2))
        context.fill()
    },
    drop: function(){
        if((this.y + this.r) <= 180)
            this.y += 4
        else
            this.status = true
    },
    jump: function() {
        this.y -= 150
        this.status = false
    }
}
var barriers = {
    vet: [],
    colors: ['#0000ff', '#ff0000', '#00ff00', '#ffff00', '#ff00ff'],
    time: 0,
    insert: function(){
        this.vet.push({
            x: window.innerWidth,
            color: this.colors[Math.floor(5 * Math.random())],
            h: 50 + Math.floor(30 * Math.random()),
            w: 40 + Math.floor(20 * Math.random())
        })

        this.time = 100 + Math.floor(50 * Math.random())
    },
    update: function(){
        if(this.time == 0)
            this.insert()
        else
            this.time--
        
        for(let i = 0; i < this.vet.length; i++){
            this.vet[i].x -= 6;
            
            if(this.vet[i].x <= -this.vet[i].w){
                this.vet.splice(i, 1)
            }
        }
    },
    draw: function(){
        for(let i = 0; i < this.vet.length; i++){
            context.fillStyle = this.vet[i].color
            context.fillRect(this.vet[i].x, (HEIGHT - this.vet[i].h), this.vet[i].w, this.vet[i].h)
        }
    }
}

function update(){
    cactusBackground.update()
    cactus.update()
    barriers.update()
    ball.drop()
}
function draw(){
    updateBackgroundCanvas()
    
    floor.draw()
    cactusBackground.draw()
    cactus.draw()
    barriers.draw()

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
function KeyDown(evt){
    switch(evt.keyCode){
        case 65:            // seta <-
            ball.x -= 10
        break
        case 68:            // seta ->
            ball.x += 10
        break
        case 32:
            if(ball.status)
                ball.jump()
        break
    }
}
function main(){
    HEIGHT = 200
    WIDTH = window.innerWidth

    canvas = document.createElement('canvas')

    canvas.width = WIDTH
    canvas.height = HEIGHT

    context = canvas.getContext('2d')

    document.body.appendChild(canvas)

    window.addEventListener('keydown', KeyDown, true)
    

    execute()
}
main()
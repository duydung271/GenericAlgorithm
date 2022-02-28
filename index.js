const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = cWidth
canvas.height = cHeight

var KeySpace = {
    isPress: false,
}


var bots = []
var couplePipes = []

let totals_bot = NUM_BOT

var index_fartest_pipe = NUM_PIPE-1


function init(){

    for (let i =1; i<=NUM_BOT;++i){
        const bot = new Bot(new Policy_Network())
        bot.color = `rgb(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)})`
        bots.push(bot)
    }
    
    for (let i=1;i<=NUM_PIPE;++i){
        const couplePipe=new CouplePipe(cWidth+SPACE_PIPE*i,cHeight/2+random(-150,150))
        couplePipes.push(couplePipe);
    }
}

function isCollitionWithPipe(bot, couplePipe){
    if (bot.position.x+bot.rect.w>couplePipe.position.x
        &&bot.position.x<couplePipe.position.x + couplePipe.rect.w
        &&(
            bot.position.y + bot.rect.h > couplePipe.position.y + couplePipe.pipe_gap/2
            || bot.position.y < couplePipe.position.y - couplePipe.pipe_gap/2)
        ){
        return true
    }
    return false
}


function getFeature(bot){
    let couplePipe = couplePipes[0]
    let min_distance = cWidth
    couplePipes.forEach(element =>{
        if (bot.position.x <= element.position.x + element.rect.w){
            let distance = element.position.x + element.rect.w - bot.position.x
            if (min_distance > distance){
                min_distance = distance
                couplePipe = element
            }
           
        }
    })
    return {
        distance_x: min_distance/1000,
        distance_h: (bot.position.y - couplePipe.position.y)/1000,
        velocity: bot.velocity.y/100
    }
}

function resetAll(){
    totals_bot = NUM_BOT
    index_fartest_pipe = NUM_PIPE -1
    bots.forEach(val=>{
        val.reset()
    })
    couplePipes.forEach(val=>{
        val.reset()
    })
}

let isStart = false
function start_screen(){
    if (KeySpace.isPress) isStart=true
    c.font = '50px serif';
    c.fillText(`Press space to start !`, cWidth/2-200,cHeight/2)
}

let generation_th = 0
// / Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if(isStart){
        bots.forEach(entity => {
            entity.update()
        })
        couplePipes.forEach(entity => {
            entity.update()
        })
        couplePipes.forEach(entity => {
            c.fillStyle = entity.color;
            entity.draw(c)
        })
        bots.forEach(entity => {
            c.fillStyle = entity.color;
            entity.draw(c)
        })
        c.fillStyle = "black";
        bots.forEach(bot=>{
            if (!bot.isDied){
                if (bot.isCollition()){
                    // console.log(bot.fitness)
                    bot.kill()
                    totals_bot-=1
                }
            }
        })

        c.font = '50px serif';
        c.fillText(`Generation : ${generation_th}`, 100,100)
        c.font = '20px serif';
        c.fillText(`Population : ${totals_bot}`, 150,125)

        draw_fitness()

        if (totals_bot==0){
            next_generation()
            resetAll()
            generation_th++
        }

    }else start_screen()
    
    
}

function draw_fitness(){
    c.fillStyle = 'black';
    c.font = '20px serif';
    c.fillText(`Fitness`, cWidth-200,100)

    for (let i =0;i<bots.length;++i){
        c.fillStyle = bots[i].color;
        c.font = '20px serif';
        c.fillText(` ${bots[i].fitness.toFixed(1)}`, cWidth-200,145+i*50)
        c.fillRect(cWidth-250,125+i*50,32,32)
    }
}


init()
animate()


addEventListener("keydown", (event)=>{
    if (event.keyCode == 32){
        KeySpace.isPress = true
    }
})

addEventListener("keyup", (event)=>{
    if (event.keyCode == 32){
        KeySpace.isPress = false
    }
})

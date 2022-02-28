const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var cWidth = innerWidth
var cHeight = innerHeight

canvas.width = cWidth
canvas.height = cHeight

var KeySpace = {
    isPress: false,
}


var bots = []
var couplePipes = []

const totals_couple_pipe = 5
const populations = 10
let totals_bot = populations


const space_pipe = 400
var index_fartest_pipe = totals_couple_pipe-1

const ground = cHeight

function init(){

    for (let i =1; i<=populations;++i){
        const bot = new Bot(new Policy_Network())
        bots.push(bot)
    }
    
    for (let i=1;i<=totals_couple_pipe;++i){
        const couplePipe=new CouplePipe(cWidth+space_pipe*i,cHeight/2+random(-150,150))
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
        distance_h: (bot.position.y - couplePipe.position.y)/1000
    }
}

function resetAll(){
    totals_bot = populations
    index_fartest_pipe = totals_couple_pipe -1
    bots.forEach(val=>{
        val.reset()
    })
    couplePipes.forEach(val=>{
        val.reset()
    })
}

let generation_th = 0
// / Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    bots.forEach(entity => {
        entity.update()
    })
    couplePipes.forEach(entity => {
        entity.update()
    })
    couplePipes.forEach(entity => {
        entity.draw(c)
    })
    bots.forEach(entity => {
        entity.draw(c)
    })
    bots.forEach(bot=>{
        if (!bot.isDied){
            if (bot.isCollition()){
                // console.log(bot.fitness)
                bot.kill()
                totals_bot-=1
            }
        }
    })
    if (totals_bot==0){
        next_generation()
        resetAll()
        generation_th++
    }
    c.font = '50px serif';
    c.fillText(`Generation : ${generation_th}`, 100,100)
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

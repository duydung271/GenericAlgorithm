var gravity = 0.5
class Bot extends Entity{
    constructor(brain){
        super(200,200)
        this.start_point = {
            x:this.position.x,
            y:this.position.y
        }
        this.rect ={
            h:64,
            w:64
        }
        this.jump_force = 10
        this.wait_realese = false

        this.fitness = 0
        this.isDied = false

        this.brain = brain

    }
    kill(){
        this.isDied=true
    }

    reset(){
        this.fitness = 0
        this.wait_realese = false
        this.position.x = this.start_point.x
        this.position.y = this.start_point.y
        this.velocity.y=0
        this.isDied = false

    }

    update(){
        if (this.isDied) return;
        this.velocity.y+=gravity
        this.fitness+=0.1

        if ((this.position.y+this.rect.h>= cHeight)){
            this.velocity.y = 0
            this.position.y = cHeight - this.rect.h
        }
        if ((this.position.y <= 0)){
            this.velocity.y = Math.abs(this.velocity.y)
        }
        if (this.think() && !this.wait_realese){
            this.velocity.y = -this.jump_force
            this.wait_realese = true
        }
        if (!this.think()){
            this.wait_realese= false
        }
        super.update()
    }
    draw(c){
        if (this.isDied) return;
        super.draw(c)
    }

    think(){
        // return KeySpace.isPress
        let ft = getFeature(this)
        let idea = this.brain.predict([ft.distance_x,ft.distance_h])
        return idea >=0.5
    }

    isCollition(){
        let check = false

        if (this.position.y<=0){
            check=true
        }
        if (this.position.y + this.rect.h>= ground){
            check=true
        }

        couplePipes.forEach(element => {
            check = isCollitionWithPipe(this,element) || check
        });
        return check
    }
}
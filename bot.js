class Bot extends Entity{
    constructor(brain){
        super(200,cHeight/2)
        this.start_point = {
            x:this.position.x,
            y:this.position.y
        }
        this.rect ={
            h:64,
            w:64
        }
        this.jump_force = FORCE_JUMP
        this.wait_realese = false

        this.fitness = 0
        this.isDied = false

        this.brain = brain
        this.wait_think = 0

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
        this.velocity.y+=GRAVITY
        this.fitness+=0.1

        if ((this.position.y+this.rect.h>= cHeight)){
            this.velocity.y = 0
            this.position.y = cHeight - this.rect.h
        }
        if ((this.position.y <= 0)){
            this.velocity.y = Math.abs(this.velocity.y)
        }
        this.wait_think++
        if (this.wait_think%8==0){
            let idea = this.think()
            if (idea && !this.wait_realese){
                this.velocity.y = -this.jump_force
                this.wait_realese = true
            }
            if (!idea){
                this.wait_realese= false
            }
            this.wait_think = 0
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
        let idea = this.brain.predict([ft.distance_x,ft.distance_h,ft.velocity])
        return idea >=0.5
    }

    isCollition(){
        let check = false

        if (this.position.y<=0){
            check=true
        }
        if (this.position.y + this.rect.h>= GROUND){
            check=true
        }

        couplePipes.forEach(element => {
            check = isCollitionWithPipe(this,element) || check
        });
        return check
    }
}
class Entity{
    constructor(x, y){
        this.position ={
            x: x,
            y: y
        }

        this.rect ={
            w: 100,
            h: 100
        }
        this.velocity= {
            x: 0,
            y: 0
        }
        this.color = "black"
    }

    update(){
        this.position.x += this.velocity.x*SPEED
        this.position.y += this.velocity.y*SPEED
    }

    draw(c){
        c.fillRect(this.position.x,this.position.y,this.rect.w,this.rect.h)
    }

}
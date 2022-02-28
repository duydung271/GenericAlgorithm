class CouplePipe extends Entity{
    constructor(x,y) {
        super(x, y)
        this.pipe_gap = 200
        this.start_position ={
            x: x,
            y: y
        }
        this.rectEachPipe= {
            h: 500,
            w: 100,
        }
        this.velocity.x = -5
        this.pipe_down = new Pipe(this.position.x, this.position.y+this.pipe_gap/2)
        this.pipe_down.rect = this.rectEachPipe
        this.pipe_up = new Pipe(this.position.x, this.position.y-this.rectEachPipe.h - this.pipe_gap/2)
        this.pipe_up.rect = this.rectEachPipe

        this.rect.h = this.rectEachPipe.h*2+ this.pipe_gap
        this.rect.w = this.rectEachPipe.w
        this.pipe_down.velocity = this.velocity
        this.pipe_up.velocity = this.velocity
    }

    reset(){
        this.position.x = this.start_position.x
        this.position.y = cHeight/2 + random(-150,150)

        this.pipe_down.position = {
            x: this.position.x,
            y: this.position.y+this.pipe_gap/2
        }
        this.pipe_up.position = {
            x: this.position.x,
            y: this.position.y-this.rectEachPipe.h - this.pipe_gap/2
        }
    }

    next_point(){
        if (index_fartest_pipe >= totals_couple_pipe){
            index_fartest_pipe = 0
        }

        let pos_x = couplePipes[index_fartest_pipe++].position.x
        
        let position = {
            x: pos_x+space_pipe,
            y: cHeight/2 + random(-150,150)
        }
        this.position = position

        this.pipe_down.position = {
            x: position.x,
            y: position.y+this.pipe_gap/2
        }
        this.pipe_up.position = {
            x: position.x,
            y: position.y-this.rectEachPipe.h - this.pipe_gap/2
        }
    }

    update(){
        super.update()
        if (this.position.x<= -this.rect.w){
            this.next_point()
        }
        this.pipe_up.update()
        this.pipe_down.update()
    }

    draw(c){
        this.pipe_up.draw(c)
        this.pipe_down.draw(c)
    }
}
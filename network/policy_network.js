class Linear{
    //Example: input luon phai co shape(1,N)
    //input: [1,2]
    //weight: [[1,2,3],[1,2,3]]
    //output: [0.9,0.4,0.5]
    constructor(input_shape, ouput_shape){
        this.shape = [input_shape, ouput_shape]
        this.w = [ ...Array(input_shape*ouput_shape).keys() ].map((i) => Math.random())
        this.b = [ ...Array(ouput_shape).keys() ].map((i) => Math.random())
    }

    predict(x){
        const y = new Array()
        for (let j = 0;j<this.shape[1];++j){
            let val = 0
            for (let i = 0;i<this.shape[0];i++){
                val += x[i]*this.w[j+i*this.shape[1]]
            }
            y.push(val+this.b[j])
        }
        return y
    }
}

class Policy_Network{
    // Input [x1,x2]
    // Ouput 0.99
    //x1: Khoang cach tu top_left cua bot, den pos_right cua pipe/1000
    //x2: top_left bot - mid_y couple pipe/1000
    constructor(){
        this.layers=[
            new Linear(3,3),
            new Linear(3,6),
            new Linear(6,1)
        ]
    }
    predict(x){
        let y = x
        for (let i =0 ;i< this.layers.length;++i){
            y = this.layers[i].predict(y)
        }
        return y[0]
    }
}

// pl = new Policy_Network()
// console.log(pl.predict([1,2]))
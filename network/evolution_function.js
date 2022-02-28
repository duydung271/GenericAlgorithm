function matrix_cossover(mat_a, mat_b){
    let len =mat_a.length
    let crossover_point = randomInt(len)
    let child_a = new Array()
    let child_b = new Array()
    for (let i =0;i<crossover_point;++i){
        child_a.push(mat_a[i])
        child_b.push(mat_b[i])
    }
    for (let i =crossover_point;i<len;++i){
        child_a.push(mat_b[i])
        child_b.push(mat_a[i])
    }
    return [child_a,child_b]
}

// let mat_a = [1,2,3,4]
// let mat_b = [5,6,7,8]
// console.log(matrix_cossover(mat_a,mat_b))

function layer_cossover(layer_a, layer_b){
    let shape = layer_a.shape
    let child_a = new Linear(shape[0],shape[1])
    let child_b = new Linear(shape[0],shape[1])
    
    let child_weight = matrix_cossover(layer_a.w, layer_b.w)
    child_a.w = child_weight[0]
    child_b.w = child_weight[1]
    
    let child_bias = matrix_cossover(layer_a.b, layer_a.b)
    child_a.b = child_bias[0]
    child_b.b = child_bias[1]

    return [child_a, child_b]
}

// let lin1 = new Linear(2,3)
// let lin2 = new Linear(2,3)
// let x = [1,2]
// console.log(lin1.predict(x),lin2.predict(x))
// let child = layer_cossover(lin1,lin2)
// console.log(child[0].predict(x),child[1].predict(x))

function crossover(parent_a, parent_b){
    let len = parent_a.layers.length
    let child_a = new Policy_Network()
    let child_b = new Policy_Network()

    for (let i =0;i<len;++i){
        layer_child = layer_cossover(parent_a.layers[i],parent_b.layers[i])
        child_a.layers[i] = layer_child[0]
        child_b.layers[i] = layer_child[1]
    }

    return [child_a, child_b]
}

// p1 = new Policy_Network()
// p2 = new Policy_Network()
// x =[1,2]
// console.log(p1.predict(x), p2.predict(x))
// child_p = crossover(p1,p2) 
// console.log(child_p[0].predict(x), child_p[1].predict(x))

function matrix_mute(mat, rate){
    let len = mat.length
    let max = getMax(mat)
    let min = getMin(mat)
    let sigma = (max-min)/max
    let num_sample = Math.floor(len*rate)
    if (num_sample==0) num_sample = 1

    while(num_sample>0){
        let idx = randomInt(len)
        if (idx < len){
           mat[idx] = gaussianRandom(mat[idx],sigma)
        }  
        num_sample-=1
    }
    return mat
}

// let mat = [1,2,3,4]
// console.log(matrix_mute(mat,0.1))


function layer_mute(layer,rate){
    layer.w = matrix_mute(layer.w,rate)
    layer.b = matrix_mute(layer.b,rate)
    return layer
}

// let lin1 = new Linear(2,3)
// let lin2 = new Linear(2,3)
// let x = [1,2]
// console.log(lin1.predict(x),lin2.predict(x))
// let child = layer_cossover(lin1,lin2)
// console.log(child[0].predict(x),child[1].predict(x))
// child[0] = layer_mute(child[0],0.2)
// child[1] = layer_mute(child[1],0.2)
// console.log(child[0].predict(x),child[1].predict(x))


function mute(agent, rate){
    for (let i =0 ;i<agent.layers.length;++i){
        agent.layers[i] = layer_mute(agent.layers[i], rate)
    }
    return agent
}

// p1 = new Policy_Network()
// p2 = new Policy_Network()
// x =[0.1,0.2]
// console.log(p1.predict(x), p2.predict(x))
// child_p = crossover(p1,p2) 
// console.log(child_p[0].predict(x), child_p[1].predict(x))
// child_p[0] = mute(child_p[0],0.1)
// child_p[1] = mute(child_p[1],0.1)
// console.log(child_p[0].predict(x), child_p[1].predict(x))

// function selection(weights){
//     let idx_par1 = 0
//     let idx_par2 = 1
//     if (weights[idx_par1]<weights[idx_par2]){
//         idx_par1 =1
//         idx_par2 =0
//     }
//     for (let i =2;i<weights.length;++i){
//         if (weights[idx_par1]<=weights[i]){
//             idx_par2 = idx_par1
//             idx_par1 = i
//         }else if (weights[idx_par2]<weights[i]){
//             idx_par2 = i
//         }
//     }
//     return [idx_par1, idx_par2]
// }


function selection(weights){
    ft = weights.map((value,index) => [value,index]);
    ft = ft.sort((x,y)=>y[0]-x[0])
    selected = []
    for (let i =0;i<4;i++){
        selected.push(ft[i][1])
    }
    return selected
    
}

// let x = [4,6,3,4,5]
// console.log(selection(x))
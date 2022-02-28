function get_fitness(){
    let fitness = new Array()
    for (let i =0;i <bots.length;i++){
        fitness.push(bots[i].fitness)
    }
    return fitness
}

function next_generation(){
    let brains = new Array()
    let fitness = get_fitness()
    idx_par = selection(fitness)
    
    // for (let i=0;i<idx_par.length;++i){
    //     brains.push(bots[idx_par[i]].brain)
    // }
    brains.push(bots[idx_par[0]].brain)
    

    for (let i =0;i<idx_par.length;++i){
        for (let j =i+1;j<idx_par.length;++j){
            let child = crossover(bots[idx_par[i]].brain,bots[idx_par[j]].brain)
            child[0] = mute(child[0],0.1)
            child[1] = mute(child[1],0.1)
            brains.push(child[0])
            brains.push(child[1])
        }
    }

    for (let i =0;i<bots.length;++i){
        bots[i].brain = brains[i]
    }
}
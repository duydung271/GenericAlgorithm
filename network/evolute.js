
function next_generation(){
    let brains = new Array()
    let fitness = new Array()
    for (let i =0;i <bots.length;i++){
        fitness.push(bots[i].fitness)
    } 
    idx_par = selection(fitness)
    
    brains.push(bots[idx_par[0]].brain)
    brains.push(bots[idx_par[1]].brain)

    for (let i =0;i< populations/2-1;++i){
        let child = crossover(bots[idx_par[0]].brain,bots[idx_par[1]].brain)
        child[0] = mute(child[0],0.1)
        child[1] = mute(child[1],0.1)
        brains.push(child[0])
        brains.push(child[1])
    }
    for (let i =0;i<bots.length;++i){
        bots[i].brain = brains[i]
    }
}

function random(a,b,space=30){
    let distance = Math.abs(a)+Math.abs(b);
    return Math.floor(Math.random() * distance/space)*space-Math.floor(distance/2)
}

function gaussianRandom(mean, sigma) {
    let u = Math.random()*0.682;
    return ((u % 1e-8 > 5e-9 ? 1 : -1) * (Math.sqrt(-Math.log(Math.max(1e-9, u)))-0.618))*1.618 * sigma + mean;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function getMax(arr){
    let max = -999999
    arr.forEach(element => {
        max = Math.max(max,element)
    });
    return max
}

function getMin(arr){
    let min = 999999
    arr.forEach(element => {
        min = Math.min(min,element)
    });
    return min
}
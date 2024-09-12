function Mission1(arr){
    return arr.filter(num => num % 2 === 0);
}

function Mission2(str) {
    const words = str.split(' ');
    return words.filter(word => word.length === 4).length;
}

function Mission3(arr) {
    return arr.flat();
}

function Mission5(keys, values) {
    const newObj = {};
    const minLength = Math.min(keys.length, values.length);
    keys.forEach((kew, i) => {
        if (i < minLength) {
            newObj[kew] = values[i];
        }
    });
    return newObj;
}

module.exports = {
    Mission1,
    Mission2,
    Mission3,
    Mission5
}
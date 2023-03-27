function quitarDuplicados(original) {

    let sinDuplicados = [];

    for (let i = 0; i < original.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < sinDuplicados.length; j++) {
            if (original[i].id === sinDuplicados[j].id) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            sinDuplicados.push(original[i]);
        }
    }
    return sinDuplicados;
}

module.exports = quitarDuplicados;
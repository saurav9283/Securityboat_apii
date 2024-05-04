export const getMapWithKeyValues = (array, key1, key2) => {
    const map = new Map();
    array.forEach((item) => {
        map.set(item[key1], item[key2]);
    });
    return map;
}


export const  getSeatNumberAndType = (uniqueKey) => {

    const matches = uniqueKey.match(/^(\d+)([a-zA-Z]+)/);
    if (matches && matches.length === 3) {
        const seatNo = parseInt(matches[1]); // Extracted number
        const type = matches[2]; // Extracted string
        return { seatNo, type };
    }
    return null;
}

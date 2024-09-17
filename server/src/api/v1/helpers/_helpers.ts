export const getObjectValues = (obj:  any) => {
    const values = [];
    for(let key in obj) {
        values.push(obj[key]);
    }
    return values
}
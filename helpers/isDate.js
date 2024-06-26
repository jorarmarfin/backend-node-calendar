const moment = require('moment');
const isDate = (date) => {
    if (!date) {
        return false;
    }
    const fecha = moment(date);
    return fecha.isValid();
}
module.exports = {
    isDate
}
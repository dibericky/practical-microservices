const createWrite = require('./write')

module.exports = function createMessageStore({ db }) {
    const write = createWrite({db})
    return {
        write
    }
}
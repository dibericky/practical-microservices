const uuid = require('uuid/v4')

module.exports = function primeRequestContext(req, res, next)  {
    req.context = {
        traceId: uuid()
    }
    next()
}
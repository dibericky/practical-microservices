const express = require('express')

function createActions({}) {
    return {
        recordViewing(traceId, videoId) {
            return
        }
    }
}

function createHandlers({ actions }) {
    return {
        handleRecordViewing(req, res) {
            return actions
                .recordViewing(req.context.traceId, req.params.videoId)
                .then(() => res.redirect('/'))
        }
    }
}

module.exports = function createRecordViewings ({}) {
    const actions = createActions({})
    const handlers = createHandlers({actions})
    const router = express.Router()
    router.route('/:videoId').post(handlers.handleRecordViewing)
    return {
        actions,
        handlers,
        router
    }
}
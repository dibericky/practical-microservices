const express = require('express')
const uuid = require('uuid/v4')

function createActions({ messageStore }) {
    return {
        recordViewing(traceId, videoId, userId) {
            const viewedEvent = {
                id: uuid(),
                type: 'VideoViewed',
                metadata: {
                    traceId,
                    userId
                },
                data: {
                    userId,
                    videoId
                }
            }
            const streamName = `viewing-${videoId}`
            return messageStore.write(streamName, viewedEvent)
        }
    }
}

function createHandlers({ actions }) {
    return {
        handleRecordViewing(req, res) {
            return actions
                .recordViewing(req.context.traceId, req.params.videoId, req.context.userId)
                .then(() => res.redirect('/'))
        }
    }
}

module.exports = function createRecordViewings ({ messageStore }) {
    const actions = createActions({messageStore})
    const handlers = createHandlers({actions})
    const router = express.Router()
    router.route('/:videoId').post(handlers.handleRecordViewing)
    return {
        actions,
        handlers,
        router
    }
}
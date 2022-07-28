const camelCaseKeys = require('camelcase-keys')
const express = require('express')

function createHandlers ({ queries }) {
    return {
        home(req, res, next) {
            return queries
                .loadHomePage()
                .then(viewData => {
                    console.log('rendering...')
                    return res.render('home/templates/home', viewData)
                })
                .catch(next)
        }
    }
}

function createQueries ( {db} ) {
    return {
        loadHomePage() {
            console.log('Loading home...')
            return db.then(client => client('videos')
                .sum('view_count as videosWatched')
                .then(rows => {
                    console.log('Sum done')
                    return rows[0]})
                )
        }
    }
}

module.exports = function createHome ({ db }) {
    const queries = createQueries({db})
    const handlers = createHandlers( {queries})
    const router = express.Router()
    router.route('/').get(handlers.home)
    return {
        handlers,
        queries,
        router
    }
}
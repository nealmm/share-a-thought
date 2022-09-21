const router = require('express').Router()

router.use((req, res) => {
    res.status(404).send('<h1>404 - Not found</h1>')
})

module.exports = router
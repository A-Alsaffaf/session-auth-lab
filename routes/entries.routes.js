// imports
const router = require('express').Router()
const Entry = require('../models/Entry')
const isSignedIn = require("../middleware/is-signed-in");

// routes
router.get('/new',isSignedIn, (req,res) => {
    res.render('./entries/create-entry.ejs')
})

router.post('/', isSignedIn, async (req, res) => {
    req.body.isPublic = Boolean(req.body.isPublic)
    const createdEntry = await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: req.body.isPublic,
        owner: req.session.user._id
    })
    res.redirect('/')
})


module.exports = router
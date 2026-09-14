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
    res.redirect('/entries')
})

router.get('/', async (req,res) => {
    const allEntries = await Entry.find({ isPublic: true })
    console.log(allEntries);
    res.render('./entries/all-entries.ejs', {entries: allEntries})
})

router.get('/my-entries', isSignedIn, async (req,res) => {
    const userEntries = await Entry.find({owner: req.session.user._id})
    console.log('All User Entries');
    console.log(userEntries);
    res.render('./entries/my-entries.ejs', {entries: userEntries})    
})


module.exports = router
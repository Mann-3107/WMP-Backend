const express = require('express');
const router = express.Router();
const Work = require('../models/Work');
const Status = require('../models/Status');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE-1: Get all the work Assigned using: GET "/api/work/coordie/fetchallworks"
router.get('/coordie/fetchallworks', fetchuser, async(req, res) => {
    try {
        const works = await Work.find({ coordie: req.user.id });
        res.json(works);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-1a: Get all the work Assigned using: GET "/api/work/cg/fetchallworks"
router.post('/cg/fetchallworks', [
    body('coordie').exists()
], async(req, res) => {
    try {
        
        const works = await Work.find(req.cooride);
        res.json(works);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-2: Assign a new work to a coordie using: POST "/api/work/cg/addwork" . Login Required
router.post('/cg/addwork', fetchuser, [
    body('description').exists()
], async(req, res) => {
    try {
        const { description, coordie } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const new_work = new Work({
            cg: req.user.id,
            coordie: coordie,
            description: description
        })
        const saved_work = await new_work.save()
        res.json(saved_work)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-3: Updating Work Status: POST "/api/work/coordie/updatestatus" . Login Required
router.post('/coordie/updatestatus', fetchuser, [
    body('comments').exists()
], async(req, res) => {
    try {
        const { comments, work } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const new_comment = new Status({
            coordie: req.user.id,
            work: work,
            comments: comments
        })
        const saved_comment = await new_comment.save()
        res.json(saved_comment)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/cg/lastupdate', [
    body('work').exists()
], async(req, res) => {
    try{
        const latestComment = await Status.find({ work: req.body.work })
        res.json(latestComment[latestComment.length - 1])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/coordie/allupdates', fetchuser, async(req, res) => {
    try{
        const comments = await Status.find({ coordie: req.user.id })
        res.json(comments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
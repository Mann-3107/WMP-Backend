const express = require('express');
const router = express.Router();
const Coordie = require('../models/Coordie');
const Cg = require('../models/Cg');
const Venue = require('../models/Venue');
const Work = require('../models/Work');
const Portfolio = require('../models/Portfolio');
const Department = require('../models/Department');
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Piyushchutiyah";


// ROUTE-1: Create a CG user using: POST "/api/auth/cg/createuser". Doesnt require Auth
router.post('/cg/createuser', [
    body('name').exists(),
    body('ldap').isLength({ max: 9 }),
    body('password').isLength({ min: 8 }),
    body('department').exists()
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user exists already
    try{
        let user = await Cg.findOne({ldap: req.body.ldap});
        if (user) {
            return res.status(400).json({ error: "Error" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await Cg.create({
            ldap: req.body.ldap,
            password: secPass,
            name: req.body.name,
            department: req.body.department
        })
        const data = {
            user: {
                id: user.id,
                department: user.department
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-2: Authenticate a CG user using: POST "/api/auth/cg/login". Doesnt require Auth
router.post('/cg/login', [
    body('ldap').exists(),
    body('ldap').isLength({ max: 9 }),
    body('password').isLength({ min: 8 })
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user exists already
    const { ldap, password } = req.body;
    try{
        let user = await Cg.findOne({ldap: ldap});
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id,
                department: user.department
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-3: Create a CO-ORDIE user using: POST "/api/auth/coordie/createuser". Doesnt require Auth
router.post('/coordie/createuser', [
    body('name').exists(),
    body('ldap').isLength({ max: 9 }),
    body('password').isLength({ min: 8 }),
    body('department').exists(),
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user exists already
    try{
        let user = await Coordie.findOne({ldap: req.body.ldap});
        if (user) {
            return res.status(400).json({ error: "Error" })
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        
        
        user = await Coordie.create({
            ldap: req.body.ldap,
            password: secPass,
            name: req.body.name,
            department: req.body.department,
            venue: req.body.venue,
            portfolio: req.body.portfolio
        })
        const data = {
            cg: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE-4: Authenticate a COORDIE user using: POST "/api/auth/coordie/login". Doesnt require Auth
router.post('/coordie/login', [
    body('ldap').exists(),
    body('ldap').isLength({ max: 9 }),
    body('password').isLength({ min: 8 })
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user exists already
    const { ldap, password } = req.body;
    try{
        let user = await Coordie.findOne({ldap: req.body.ldap});
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-5a: Get logged in CG details using: GET 'api/auth/cg/getdetails. Login required
router.get('/cg/getdetails', fetchuser, async (req, res) => {
    try {
        const details = await Cg.findById(req.user.id);
        res.send(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error');
    }
})

// ROUTE-5: Get logged-in CG coordies using: POST "/api/cg/" .Login Required
router.get('/cg/getcoordies', fetchuser, async (req, res) => {
    try{
        const coordies = await Coordie.find({ department: req.user.department });
        res.send(coordies)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-6: Get logged-in COORDIE details using: POST "/api/auth/coordie/getuser" .Login Required
router.post('/coordie/getuser', fetchuser, async (req, res) => {
    try{        
        const works = await Work.find({ coordie: req.user.id })
        res.send(works)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-7: Fetch all venues: GET "/api/auth/getvenues"
router.get('/getvenues', async (req, res) => {
    try{        
        const venues = await Venue.find()
        res.send(venues)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-8: Fetch all venues: GET "/api/auth/getportfolios"
router.get('/getportfolios', async (req, res) => {
    try{        
        const portfolios = await Portfolio.find()
        res.send(portfolios)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-9: Fetch all departments: GET "/api/auth/getdepartments"
router.get('/getdepartments', async (req, res) => {
    try{        
        const departments = await Department.find()
        res.send(departments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router
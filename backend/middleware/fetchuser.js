const jwt = require('jsonwebtoken');
const JWT_SECRET = "Piyushchutiyah";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add ID to the request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
}

module.exports = fetchuser;
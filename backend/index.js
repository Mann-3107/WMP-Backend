const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth/', require('./routes/auth.js'))
app.use('/api/work/', require('./routes/works.js'))

app.get('/', (req, res)=>{
    res.send("Hello Mann!");
})

app.listen(port, () => {
    console.log(`Example app listening at http://lcoalhost:${port}`)
})
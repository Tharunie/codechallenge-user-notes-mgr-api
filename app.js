//Import the dependencies
const express=require("express");
const app = express();
const { MONGODB } = require('./config');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const zip = require('express-easy-zip');
var path= require("path");

const usersRoute = require('./routes/usersroute');
const notesRoute = require('./routes/notesroute');
const archivesRoute = require('./routes/archivesroute');
const auth = require('./noteMgmtMiddleWare/auth');


//port No
const port = 3000;

//adding the middleware-cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//use express-zip
app.use(zip());

//static files
app.use(express.static(path.join(__dirname,"public")));


app.use('/api/notes', auth, notesRoute);
app.use('/api/users', usersRoute);
app.use('/api/archives',auth,archivesRoute);



app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err.message } });
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongodb');
        return app.listen(3000);
    })
    .then(() => console.log('server running at 3000'))
    .catch(err => console.log(err.message));
const express = require("express");
const app = express();
const routes = require('./routes');

//express middleware for json request
app.use(express.json());
//use routes.js with all queries that start with /api
app.use('/api', routes);

//Error Middleware
app.use((req, res, next) => {
    const err =  new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error Handler 
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen(3000, () => console.log("Quote API listening on port 3000!"));

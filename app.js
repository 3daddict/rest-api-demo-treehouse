const express = require('express');
const app = express();

//Get Method
app.get('/greetings', (req, res) => {
    //respond with json object
    res.json({greeting: "Hello World!"});
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

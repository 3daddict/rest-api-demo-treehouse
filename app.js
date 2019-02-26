const express = require("express");
const app = express();

const records = require("./records");

//Error Handler Helper Function
function asyncHandler(cb){
    return async (req, res, next)=>{
      try {
        await cb(req,res, next);
      } catch(err){
        next(err);
      }
    };
  }

//express middleware for json request
app.use(express.json());

//Send a GET request to /quotes READ a list of quotes
app.get("/quotes", asyncHandler(async(req, res) => {
    //create a variable that reads all quotes from database
    const quotes = await records.getQuotes();
    res.json(quotes);
}));

//Send a GET request to /quotes/:id to READ (view) a quote
app.get("/quotes/:id", asyncHandler(async(req, res) => {
    const quote = await records.getQuote(req.params.id);
    if(quote) {
        res.json(quote);
    } else {
        res.status(404).json({ message: err.message });
    }
}));

//Send a POST request to /quotes CREATE a new quote
app.post('/quotes', asyncHandler(async(req, res) => {
    if(req.body.quote && req.body.author) {
        const quote = await records.createQuote({
            //using body property to access the values of the object
            quote: req.body.quote,
            author: req.body.author
          });
            res.status(201).json(quote);
      } else {
        res.status(400).json({ message: "Quote and author are required" });
      }
}));


//Send a PUT request to /quotes/:id UPDATE (edit) a quote
app.put('/quotes/:id', asyncHandler(async(req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;

        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found..." })
    }
}));

//Send a DELETE request to /quotes/:id Delete a quote
app.delete('/quotes/:id', asyncHandler(async(req, res, next) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
    await records.deleteQuote(quote);
    res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found..." })
    }
}));

//Send a GET request to /quotes/quote/random to READ (view) a random quote


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

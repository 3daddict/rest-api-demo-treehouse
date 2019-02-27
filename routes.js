const express = require("express");
const router = express.Router();
const records = require("./records");

//Error Handler Helper Function
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

//Send a GET request to /quotes READ a list of quotes
router.get("/quotes", asyncHandler(async(req, res) => {
    //create a variable that reads all quotes from database
    const quotes = await records.getQuotes();
    res.json(quotes);
}));

//Send a GET request to /quotes/:id to READ (view) a quote
router.get("/quotes/:id", asyncHandler(async(req, res) => {
    const quote = await records.getQuote(req.params.id);
    if(quote) {
        res.json(quote);
    } else {
        res.status(404).json({ message: err.message });
    }
}));

//Send a POST request to /quotes CREATE a new quote
router.post('/quotes', asyncHandler(async(req, res) => {
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
router.put('/quotes/:id', asyncHandler(async(req, res) => {
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
router.delete('/quotes/:id', asyncHandler(async(req, res, next) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
    await records.deleteQuote(quote);
    res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found..." })
    }
}));

//Send a GET request to /quotes/quote/random to READ (view) a random quote


module.exports = router;
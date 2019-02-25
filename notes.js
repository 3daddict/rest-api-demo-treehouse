//Send a GET request to /quotes READ a list of quotes
app.get('/quotes', (req, res) => {
    //respond with json data from data variable example below
    res.json(data);
});

//Send a GET request to /quotes/:id to READ (view) a quote
app.get('/quotes/:id', (req, res) => {
    //use req.params to view parameters send by the client
    // console.log('Req Parameter ID', req.params.id);

    //compare id from cleint and db to check for a match
    //note: using a == instead of === becuase the parameter is a string while the quote is a number
    const quote = data.quotes.find( quote => quote.id == req.params.id );
    //send the quote variable to the client as JSON data
    res.json(quote);
});

//Asycronis Request Example
//NOTE THESE USE THE RECORDS.JS THAT ACTS AS AN ORM FRAMEWORK
//Send a GET request to /quotes READ a list of quotes
app.get('/quotes', async (req, res) => {
    //create a variable that reads all quotes from database
    const quotes = await records.getQuotes();
    res.json(quotes);
});

//Send a GET request to /quotes/:id to READ (view) a quote
app.get('/quotes/:id', async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    res.json(quote);
});

//Send a POST request to /quotes CREATE a new quote
app.post('/quotes', async (req, res) => {
    const quote = await records.createQuote({
        //using body property to access the values of the object
        quote: req.body.quote,
        author: req.body.author
    });
    res.json(quote);
});

//Same with error handling
//Send a POST request to /quotes CREATE a new quote
app.post("/quotes", async (req, res) => {
    try {
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
      
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });
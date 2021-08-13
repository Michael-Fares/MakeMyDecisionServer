// Added dotenv here
require('dotenv').config()
//
const express = require("express");
const bodyParser = require("body-parser");

const usersRouter = require('./routers/users.js');
const decisionsRouter = require('./routers/decisions.js');

const app = express();


app.use(bodyParser.json())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/decisions', decisionsRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Make My Decision Server!')
})

const port = process.env.PORT || 4001;

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});

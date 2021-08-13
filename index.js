// Added dotenv here
require('dotenv').config()
//
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())
app.use(express.json())

app.use('/', usersRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Make My Decision Server!')
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});

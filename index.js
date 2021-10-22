// Added dotenv here
require('dotenv').config()
//
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const usersRouter = require('./routers/users.js');
const decisionsRouter = require('./routers/decisions.js');
const criteriaRouter = require('./routers/criteria.js');
const optionsRouter = require('./routers/options.js');
const rankingsRouter = require('./routers/rankings.js');

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.use('/users', usersRouter)
app.use('/decisions', decisionsRouter)
app.use('/criteria', criteriaRouter)
app.use('/options', optionsRouter)
app.use('/rankings', rankingsRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Make My Decision Server!')
})

const port = process.env.PORT || 4001;

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});

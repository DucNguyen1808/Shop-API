const express = require('express');
const morgan = require('morgan');
const routerApi = require('./routes');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();
const app = express();
const port = 9090;

app.use(express.json());
app.use(cors());
db.connectToMongodb();

morgan(':method :url :status :res[content-length] - :response-time ms');
app.get('/', (req, res) => {
  res.send('Hello World!');
});
routerApi(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

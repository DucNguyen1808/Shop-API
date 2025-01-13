const express = require("express");
const morgan = require("morgan");
const routerApi = require("./routes");
const db = require('./config/db')

const app = express();
const port = 3000;

app.use(express.json());
db.connect();
morgan(":method :url :status :res[content-length] - :response-time ms");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
routerApi(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shop-api");
    console.log("Connect successfully!!!");
  } catch (err) {
    console.log(`Connect failure!!!`);
    console.log(`error: ${err}`);
  }
}

module.exports = { connect };

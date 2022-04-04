// Third party modules
const mongoose = require("mongoose");
require("dotenv").config();

// Establish connection to the database
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      return console.log("Unable to connect to database:\n" + error.message);
    }
    console.log(`Connection to ${process.env.DB.toUpperCase()} database successful`);
  }
);

// Current connection state
console.log(mongoose.STATES[mongoose.connection.readyState] + "...");

// DOTENV VARIABLE
require("dotenv").config();

// STATE VARIABLES
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

const errorHandler = require("./middlewares/errorHandler.js");
const routes = require("./routes/index.js");

const PORT = process.env.PORT || 3000;
const app = express();

//CONNECTION
connect(
  process.env.MONGOOSE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    console.log(err ? err : "successfully connected to mongoose");
  }
);

// MIDDLE WARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//SESSION
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
};
app.use(session(sessionOptions));

//ROUTE
app.use("/", routes);

//ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

app.listen(PORT, () => console.log("listening on port", PORT));

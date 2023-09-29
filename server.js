const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Login1Router = require("./routes/api/Login1");
const Login2Router = require("./routes/api/Login2");
const Login3Router = require("./routes/api/Login3");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

const APPBOOKING = require("./routes/api/AppBooking");
const PATIENTCHECKIN = require("./routes/api/PatientCheckin");
const PharmacyRouter=require("./routes/api/Pharmacy");

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  })
);
//route middleware
app.use(APPBOOKING);
app.use(PATIENTCHECKIN);
app.use(PharmacyRouter);

app.use(express.json());
// DB Config
const db = config.get("mongoURI");
// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
//initialize passport
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/Login1", Login1Router);
app.use("/api/Login2", Login2Router);
app.use("/api/Login3", Login3Router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

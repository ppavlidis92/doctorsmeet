//Modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();
var paginate = require("handlebars-paginate");
const mongoose = require("mongoose");
const verifyToken = require("../helper/validate-token");
const jwt = require("jsonwebtoken");
var moment = require('moment');





//DB connect
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
    // ftiakseAmka();
  }
);

// async function ftiakseAmka() {
//   var User = require("../models/users");
//   const users = await User.find({}).exec((err, users) => {
//     let UserAmka = 10010022234;
//     //console.log(users);
//     users.forEach(async (user) => {
//       UserAmka = UserAmka + 1;
//       await User.findOneAndUpdate({ _id: user._id }, { UserAmka: UserAmka });
//     });
//   });
// }

// Application Dependecies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//define paths for Express config -CSS -TEMPLATES -VIEWS
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebarsand views location
app.set("view engine", "hbs"); //HANDLE BAR -dynamic tamplets
app.set("views", viewsPath); //HANDLE BAR  search for views foldre by default--> now it search for templates
hbs.registerPartials(partialsPath);
hbs.registerHelper("paginate", paginate);





////////////HANDLEBARS HELPER /////////////////////
hbs.registerHelper('formatTime', function (date, format) {
  var mmnt = moment(date);
  return mmnt.format(format);
});

hbs.registerHelper('equal', function (valueA, valueB) {
  return valueA === valueB;
});

////////////HANDLEBARS HELPER /////////////////////






//setup static directory
app.use(express.static(publicDirectoryPath));

//PROBABLY WILL BE NEEDED ESPESSIALLY WHEN A FRONT IS IMPLEMENT -CORS
// app.use((req, res, next) => {
// 	res.append('Access-Control-Allow-Origin', ['*']);
// 	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.append('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// });

//DECLARE routers
const homeRouter = require("../routers/home");
const loginRouter = require("../routers/login");
const userRouter = require("../routers/user");
const patientRouter = require("../routers/patient");
const visitRouter = require("../routers/visit");
const signupRouter = require("../routers/signup");
const logoutRouter = require("../routers/logout");
const editRouter = require("../routers/edit");
const emailRouter = require("../routers/email");
const async = require("hbs/lib/async");

//LINK routers to the app
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/patient", patientRouter);
app.use("/visit", visitRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/edit", editRouter);
app.use("/email", emailRouter);

//IF you give something else than the routes declared return error

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    login: true,

    errorMessage: "Page not found",
  });
});

app.use(express.static(path.join(__dirname, "")));

module.exports = app;

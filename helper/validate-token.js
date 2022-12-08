const jwt = require("jsonwebtoken");
let usersSchema = require("../models/users").usersSchema;

global.hasAccess=false
// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {

  const _db = DBDatabase.useDb('AuthUsers')
  const User =_db.model('User',usersSchema,'user')
  let token;
  try {
    token = req.cookies.authToken;
    // console.log("token "+token)
  } catch (error) {
    console.log(error);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedUser) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        // console.log(decodedUser);
        let email = decodedUser.email;

        await User.find({ email }, (err, data) => {
          if (err) {
            console.log(err);
            res.redirect("/login");
          } else {


            if(hasAccess ==false){                  
              hasAccess=data[0].has_Access
                if (hasAccess== false) {
                  res.redirect("/logout");                  
                } 
            }
          

            next();
          }
        })
          .clone()
          .catch(function (err) {
            console.log(err);
          });
      }
    });
  } else {
    try {
      res.redirect("/login");
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
module.exports = verifyToken;

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let usersSchema = new Schema({
  fname: {
    type: String,
    index: true,
    trim: true,
    required: [true, "First name is required"],
  },
  lname: {
    type: String,
    index: true,
    trim: true,
    required: [true, "Last name is required"],
  },

  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  age: { type: Number },
  password: { type: String, require: true },
  role: {
    type: String,
    require: true,
    enum: ["ADMIN", "DOCTOR", "SECRETARY"],
  },
  has_Access: [
    {
      appname: { type: String },
      access: { type: Boolean },
    },
  ],
  Address: {
    streetName: { type: String, require: true },
    streetNumber: { type: Number, require: true },
    streetZip: { type: Number, require: true },
  },
  UserAmka: { type: Number, unique: true },
  doctor: {
    amka: { type: Number },
  },
  mobile_number: {
    type: String,
    trim: true,
  },
  start_date: Date,
  Access_end_date: Date,
  // token:{
  //     type:String
  // }
});

//to call usersSchema
//we will call it by require 'Users'
// when we implement more dbs we will call it like so
// module.exports = DB_NAME.model('Users',usersSchema,'users')
//where 'users' the name of the collection

module.exports = mongoose.model("Users", usersSchema);

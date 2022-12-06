var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let visitSchema = new Schema({
  patient: {
    fname: {
      type: String,
      index: true,
      trim: true,
      required: [true, 'To όνομα είναι υποχρεωτικό']
    },
    lname: {
      type: String,
      index: true,
      trim: true,
      required: [true, 'To επίθετο είναι υποχρεωτικό']
    },

  },
  Amka: {
    type: Number,
    require: [true, 'Tο AMKA είναι υποχρεωτικό'],
    trim: true,
    // unique: [true,'Υπάρχει χρήστης με αυτό τον αριθμό AMKA']
  },
  doctor: {
    amka: {
      type: Number,
      required: true
    },
  },
  dateVisit: {
    type : Date
  },
  symptoms: {
    type: String,
    index: true,
  },
  Gnomateush: {
    type: String,
    index: true,
  },
  Farmaka: {
    type: String,
    index: true,
  }
});

//to call usersSchema
//we will call it by require 'Users'
// when we implement more dbs we will call it like so
// module.exports = DB_NAME.model('Users',usersSchema,'users')
//where 'users' the name of the collection

//module.exports = mongoose.model("Visit", visitSchemavisitSchema);
module.exports.visitSchema =visitSchema
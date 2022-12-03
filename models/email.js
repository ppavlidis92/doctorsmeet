var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let emailSchema = new Schema({
  UrlId: {
    type: String,
    index: true,
    required: [true, "Url Id is required"],
  },
  doctor: {
    amka: { type: Number,   required: true},
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },

});

//to call usersSchema
//we will call it by require 'Users'
// when we implement more dbs we will call it like so
// module.exports = DB_NAME.model('Users',usersSchema,'users')
//where 'users' the name of the collection

module.exports = mongoose.model("Email", emailSchema);

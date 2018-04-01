const connection = require("./connection");

var Schema = connection.Schema;

var userSchema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  company_name: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  web: String,
  age: Number
});
var userModel = connection.model("users", userSchema);

module.exports = userModel;

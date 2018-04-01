var users = require("./userSchema");

var userOperations = {
  getUser: function(toSkip, limit, sortBy, sortByOrder, name, response) {
    console.log(
      `to skip :: ${toSkip} , limit :: ${limit} , sortBy ::${sortBy} ,sortByOrder :: ${sortByOrder}, name::${name}`
    );

    users.find(
      {
        $or: [
          { first_name: { $regex: name, $options: "i" } },
          { last_name: { $regex: name, $options: "i" } }
        ]
      },
      {},
      {
        skip: +toSkip,
        limit: +limit,
        sort: {
          [sortBy]: sortByOrder
        }
      },
      (err, doc) => {
        if (err) {
          console.log("error while getting users from database");
        } else {
          response.send(doc);
        }
      }
    );
  },
  createUser: function(userDetails, response) {
    let userToSave = new users(userDetails);
    userToSave.save((err, doc) => {
      if (err) console.log(`Error while saving a new user`, err.stack);
      else {
        response.send("User saved successfully");
      }
    });
  },
  findUserById: function(searchId, response) {
    users.find({ id: searchId }, (err, doc) => {
      if (err) {
        console.log("erorr while searching by id..");
      } else {
        response.send(doc);
      }
    });
  },
  updateUser: function(searchId, updates, response) {
    users.findOneAndUpdate({ id: searchId }, updates, (err, doc) => {
      if (err) {
        console.log("error while updating a record..");
      } else {
        response.send("Updated Successfully");
      }
    });
  }
};

module.exports = userOperations;

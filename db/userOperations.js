var users = require("./userSchema");

var userOperations = {
  getUser: function(toSkip, limit, sortBy, sortByOrder, name, response) {
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
          response.status(200).send(doc);
        }
      }
    );
  },
  createUser: function(userDetails, response) {
    let userToSave = new users(userDetails);
    userToSave.save((err, doc) => {
      if (err) console.log(`Error while saving a new user`, err.stack);
      else {
        response.status(201).send("User saved successfully");
      }
    });
  },
  findUserById: function(searchId, response) {
    users.find({ id: searchId }, (err, doc) => {
      if (err) {
        console.log("erorr while searching by id..");
      } else {
        response.status(200).send(doc);
      }
    });
  },
  updateUser: function(searchId, updates, response) {
    users.findOneAndUpdate({ id: searchId }, updates, (err, doc) => {
      if (err) {
        console.log("error while updating a user..");
      } else {
        response.status(200).send("Updated Successfully");
      }
    });
  },
  deleteUser: function(searchId, response) {
    users.findOneAndRemove({ id: searchId }, (err, doc) => {
      if (err) {
        console.log("error while deleting a user..");
      } else {
        response.status(200).send("Deleted Successfully");
      }
    });
  }
};

module.exports = userOperations;

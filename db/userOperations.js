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
  }
};

module.exports = userOperations;

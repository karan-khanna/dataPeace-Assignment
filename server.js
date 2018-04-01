const express = require("express");
const bodyParser = require("body-parser");
const userOperations = require("./db/userOperations");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/api/users", (request, response) => {
  let pageSize = 10; //PAGE SIZE IS UNKNOWN IN THE P.S (SO AS TO KNOW HOW MANY TO SKIP)
  let toSkip = request.query.page
    ? pageSize * request.query.page - pageSize
    : 0;
  let limit = request.query.limit ? request.query.limit : 5;
  let sortBy = request.query.sort ? request.query.sort : "id";
  let name = request.query.name ? request.query.name : "";
  let sortByOrder = 1; //1 for ascending
  if (sortBy.indexOf("-" >= 0)) {
    sortByOrder = -1; //-1 for descending
    sortBy = sortBy.split("-")[1];
  }
  userOperations.getUser(toSkip, limit, sortBy, sortByOrder, name, response);
});

app.post("/api/users", (request, response) => {
  let userDetails = request.body;
  userOperations.createUser(userDetails, response);
});

app.get("/api/users/:id", (request, response) => {
  let searchId = request.params.id;
  userOperations.findUserById(searchId, response);
});

app.put("/api/users/:id", (request, response) => {
  let searchId = request.params.id;
  let updates = request.body;
  userOperations.updateUser(searchId, updates, response);
});

app.delete("/api/users/:id", (request, response) => {
  let searchId = request.params.id;
  userOperations.deleteUser(searchId, response);
});

var port = 1234;
app.listen(port, () => {
  console.log("Server start on port....", port);
});

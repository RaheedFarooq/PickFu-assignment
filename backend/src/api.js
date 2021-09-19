const express = require("express");
const { getPopularLinks, redirectToURL, createURL } = require("./controller");

const app = express();

app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.route("/")
  .get(getPopularLinks)
  .post(createURL);

app.route("/:id")
  .get(redirectToURL);

module.exports = app;

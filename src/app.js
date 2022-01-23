const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

const accountData = fs.readFileSync("src/json/accounts.json", {encoding: "UTF-8"});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync("src/json/users.json", {encoding: "UTF-8"});
const users = JSON.parse(userData);

app.get("/", (req, resp) => {
    resp.render("index", {title: "Account Summary", accounts});
});

app.get("/savings", (req, resp) => {
    resp.render("account", {account: accounts.savings});
})

app.get("/checking", (req, resp) => {
    resp.render("account", {account: accounts.checking});
})

app.get("/credit", (req, resp) => {
    resp.render("account", {account: accounts.credit});
})

app.get("/profile", (req, resp) => {
    resp.render("profile", {user: users[0]});
})

app.listen(3000, () => {
    console.log("PS Project Running on port 3000!");
});
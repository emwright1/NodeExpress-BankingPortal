const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));

const accountData = fs.readFileSync("src/json/accounts.json", {encoding: "UTF-8"});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync("src/json/users.json", {encoding: "UTF-8"});
const users = JSON.parse(userData);

app.get("/", (req, resp) => {
    resp.render("index", {title: "Account Summary", accounts});
});

app.get("/savings", (req, resp) => {
    resp.render("account", {account: accounts.savings});
});

app.get("/checking", (req, resp) => {
    resp.render("account", {account: accounts.checking});
});

app.get("/credit", (req, resp) => {
    resp.render("account", {account: accounts.credit});
});

app.get("/profile", (req, resp) => {
    resp.render("profile", {user: users[0]});
});

app.get("/transfer", (req, resp) => {
    resp.render("transfer");
});

app.post("/transfer", (req, resp) => {
    accounts[req.body.to].balance += parseInt(req.body.amount);
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, "UTF-8");
    resp.render("transfer", {message: "Transfer Completed"})
});

app.get("/payment", (req, resp) => {
    resp.render("payment", {account: accounts.credit});
});

app.post("/payment", (req, resp) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, "UTF-8");
    resp.render("payment", {message: "Payment Successful", account: accounts.credit})
});

app.listen(3000, () => {
    console.log("PS Project Running on port 3000!");
});
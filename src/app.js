const fs = require("fs");
const path = require("path");
const express = require("express");
const {accounts, users, writeJSON} = require("./data");

const app = express();
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));

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
    writeJSON();
    resp.render("transfer", {message: "Transfer Completed"})
});

app.get("/payment", (req, resp) => {
    resp.render("payment", {account: accounts.credit});
});

app.post("/payment", (req, resp) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    resp.render("payment", {message: "Payment Successful", account: accounts.credit})
});

app.listen(3000, () => {
    console.log("PS Project Running on port 3000!");
});
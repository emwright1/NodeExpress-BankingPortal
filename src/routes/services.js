const express = require("express");
const router = express.Router();
const {accounts, writeJSON} = require("../data");

router.get("/transfer", (req, resp) => {
    resp.render("transfer");
});

router.post("/transfer", (req, resp) => {
    accounts[req.body.to].balance += parseInt(req.body.amount);
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    writeJSON();
    resp.render("transfer", {message: "Transfer Completed"})
});

router.get("/payment", (req, resp) => {
    resp.render("payment", {account: accounts.credit});
});

router.post("/payment", (req, resp) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    resp.render("payment", {message: "Payment Successful", account: accounts.credit})
});

module.exports = () => {
    return router
};
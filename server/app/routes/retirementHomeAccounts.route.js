module.exports = app => {
    const RetirementHomeAccounts = require("../controllers/retirementHomeAccounts.controller.js")

    app.post("/retirement-home/account/create", RetirementHomeAccounts.createAccount)
    app.post("/retirement-home/admin/auth", RetirementHomeAccounts.backendAuth)
}
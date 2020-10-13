module.exports = app => {
    require("./retirementHomes.route.js")(app)
    require("./residents.route.js")(app)
    require("./retirementHomeAccounts.route.js")(app)
}
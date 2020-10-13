module.exports = app => {
    const RetirementHomes = require("../controllers/retirementHomes.controller.js")

    app.post("/retirement-home/", RetirementHomes.createRetirementHome)
    app.get("/retirement-home/", RetirementHomes.getAllRetirementHomes)
    app.get("/retirement-home/:retirementHomeId", RetirementHomes.getRetirementHomeById)
}
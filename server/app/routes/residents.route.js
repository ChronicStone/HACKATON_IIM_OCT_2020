module.exports = app => {
    const Residents = require("../controllers/residents.controller.js")

    app.get("/resident/:retirementHomeId", Residents.getResidentsByRetirementHomes)
    app.get("/resident/:retirementHomeId/:residentId", Residents.getResidentById)

    app.post("/resident/", Residents.createResident)
    app.post("/resident/import", Residents.createMultipleResidents)
    
}
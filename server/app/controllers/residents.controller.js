const db = require("../models")

exports.createResident = (req, res) => {
    if(!req.body.retirement_home_id) {
        res.send({success: false, message: "Missing input params in body", body: req.body})
        return
    }

    db.residents.create({
        retirement_home_id: req.body.retirement_home_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        other_name: req.body.other_name,
        birth_date: req.body.birth_date,
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.log(err);
        res.send({success: false, message: err.message})
    })
}

exports.createMultipleResidents = (req, res) => {
    Promise.all(req.body.residents.map(resident => {
        return new Promise((resolve, reject) => {
            db.residents.create({
                retirement_home_id: resident.retirement_home_id,
                first_name: resident.first_name,
                last_name: resident.last_name,
                other_name: resident.other_name,
                birth_date: resident.birth_date,
            }).then((data) => {
                resolve({success: true})
            }).catch((err) => {
                reject({success: false})
            })
        })
    })).then((result) => {
        res.send({success: true, created: result.filter(item => item.success === true).length, not_created: result.filter(item => item.success === false).length})
    })
}

exports.getResidentsByRetirementHomes = (req, res) => {
    if(!req.params.retirementHomeId) {
        res.send({success: false, message: "Missing input retirement home id"})
        return
    }

    db.residents.findAll({
        where: {
            retirement_home_id: req.params.retirementHomeId
        }
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.log(err);
        res.send({success: false, message: err.message})
    })
}

exports.getResidentById = (req, res) => {
    if(!req.params.residentId) {
        res.send({success: false, message: "Missing input resident ID"})
        return
    }

    db.residents.findOne({
        where: {
            id: req.params.residentId
        },
        includes: [{
            model: db.residentContacts,
            where: {
                resident_id: db.Sequelize.col("resident.id")
            },
            required: false
        }]
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.log(err);
        res.send({success: false, message: err.message})
    })
}
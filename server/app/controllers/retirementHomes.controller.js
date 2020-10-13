const db = require("../models")


exports.createRetirementHome = (req, res) => {
    

    const newHome = {
        name: req.body.name,
        phone_number: req.body.phone_number,
        address1: req.body.address1,
        address2: req.body.address2,
        zip_code: req.body.zip_code,
        city: req.body.city,
        country: req.body.country
    }

    db.retirementHomes.create(newHome).then((result) => {
        console.log("NEW RETIREMENT HOME CREATED");
        res.status(200).send({
            success: true,
            data: result
        })
    }).catch((err) => {
        console.log("RETIREMENT HOME CREATION FAILED");
        console.log(err);

        res.status(500).send({
            success: false, 
            message: err.message || "Retirement home creation failed"
        })
    })
}

exports.getAllRetirementHomes = (req, res) => {
    db.retirementHomes.findAll().then((data) => {
        res.status(200).send({
            success: true,
            data: data
        })
    }).catch((err) => {
        res.status(500).send({
            success: false, 
            message: err.message || "Retirement home retrive failed"
        })
    })
}

exports.getRetirementHomeById = (req, res) => {
    if(!req.params.retirementHomeId) {
        res.send({ success: false, message: "Missing retirement home id as param"})
        return;
    }

    db.retirementHomes.findOne({
        where: {
            id: req.params.retirementHomeId
        },
        includes: [{
            model: db.residents,
            as: "residents",
            where: {
                retirement_home_id: db.Sequelize.col("retirement_home.id")
            },
            required: false
        }]
    }).then((data) => {
        if(data) {
            res.send({success: true, data: data})
            return;
        } else {
            res.send({success: false,  message: "The request retirement home does not exist" })
        }
    })
}
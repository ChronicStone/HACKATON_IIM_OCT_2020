const db = require("../models")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

exports.createAccount = (req, res) => {
    if(req.body.password != req.body.password_conf) {
        res.send({success: false, message: "Password is different from confirmation."})
        return;
    }
    
    db.retirementHomeAccounts.findOne({
        where: {
            email: req.body.email
        }
    }).then((data) => {
        if(data) {
            res.send({success: false, message: "Email already associated to an account !"})
            return;
        } else {
            db.retirementHomeAccounts.create({
                retirement_home_id: req.body.retirement_home_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: md5(req.body.password),
                email: req.body.email,
                phone_number: req.body.phone_number,
                birth_date: req.body.birth_date
            }).then((data) => {
                res.send({success: true, data: data})
            }).catch((err) => {
                console.log(err)
                res.send({success: false, message: err.message})
            })
        }
    })
}

exports.backendAuth = (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.send({success: false, message: "Missing input data"})
        return
    }

    db.retirementHomeAccounts.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        },
        include: [{
            model: db.retirementHomes,
            where: {
                id: db.Sequelize.col('retirement_home_account.retirement_home_id')
            },
            required: false
        }]
    }).then((user) => {
        if(user) {
            const userData = {
                id: user.id,
                account_type: "backend_admin",
                retirement_home_id: user.retirement_home_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                retirement_home: user.retirement_home
            }

            const token = jwt.sign(userData, process.env.BACKEND_SECRET_KEY, {
                expiresIn: '6h'
            })

            res.status(200).json({ success: true, accessToken: token, data: userData })
        } else {
            res.send({success: false, message: "Email or password incorrect, account not found."})
        }
    })
}
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS SETUP

// ### MODEL IMPORT EX :
db.retirementHomes = require("./retirementHomes.model.js")(sequelize, Sequelize);
db.retirementHomeAccounts = require("./retirementHomeAccounts.model.js")(sequelize, Sequelize);
db.residentContacts = require("./residentContacts.model.js")(sequelize, Sequelize);
db.residents = require("./residents.model.js")(sequelize, Sequelize);
db.healthcareStaff = require("./healthcareStaff.model.js")(sequelize, Sequelize);
db.chatRooms = require("./chatRooms.model.js")(sequelize, Sequelize);

// ### MODEL ASSIOCIATIONS
db.retirementHomes.hasMany(db.retirementHomeAccounts, { foreignKey: 'retirement_home_id', CONSTRAINT: false });
db.retirementHomeAccounts.belongsTo(db.retirementHomes, { foreignKey: 'retirement_home_id' })

db.retirementHomes.hasMany(db.residents, { foreignKey: 'retirement_home_id', CONSTRAINT: false });
db.residents.belongsTo(db.retirementHomes, { foreignKey: 'retirement_home_id' })

db.residents.hasMany(db.residentContacts, { foreignKey: 'resident_id', CONSTRAINT: false });
db.residentContacts.belongsTo(db.residents, { foreignKey: 'resident_id' })

db.retirementHomes.hasMany(db.healthcareStaff, { foreignKey: 'retirement_home_id', CONSTRAINT: false });
db.healthcareStaff.belongsTo(db.retirementHomes, { foreignKey: 'retirement_home_id' })

db.chatRooms.hasMany(db.residents, { foreignKey: 'retirement_home_id', as: 'room_members', CONSTRAINT: false });
db.residents.belongsTo(db.retirementHomes, { foreignKey: 'retirement_home_id' })


module.exports = db;
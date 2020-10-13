
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('retirement_home_account', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        retirement_home_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            required: true
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
    }, {
        tableName: 'retirement_home_account'
    });
};
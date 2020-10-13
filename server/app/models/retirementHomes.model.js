
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('retirement_home', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:  {
                type: DataTypes.STRING(255),
                allowNull: false
        }, 
        phone_number: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        address1: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        address2: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        zip_code: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'retirement_home'
    });
};

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('resident', {
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
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        other_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },        gender: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'm'
        },
        birth_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        },
        resident_photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'resident'
    });
};
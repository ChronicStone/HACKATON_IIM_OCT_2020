
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('resident_contact', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        resident_id: {
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
        other_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        zip_code: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(90),
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        emergencyContact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        tableName: 'resident_contact'
    });
};
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chat_room', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        room_owner: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    })
}
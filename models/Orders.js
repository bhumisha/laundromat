const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Orders extends Model{}

Orders.init(
    {
        id:
        {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_date:
        {
            type: DataTypes.DATE
        },
        order_type:
        {
            type: DataTypes.STRING
        },
        bags:{
            type:DataTypes.INTEGER,
            defaultValue:1
        },
        order_status:
        {
            type: DataTypes.STRING
        },
        comments:
        {
            type: DataTypes.STRING
        },
        customer_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        laundromat_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'laundromats',
                key: 'id'
            }
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orders'
    }


);

module.exports = Orders;
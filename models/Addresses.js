const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Addresses extends Model{}

Addresses.init(
    {
        id:
        {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        street_address: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        apartment_no:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        state:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'addresses'
    }


);
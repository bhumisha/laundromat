const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Locations extends Model{}

Locations.init(
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
        zipcode:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        laundromat_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'laundromats',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'locations'
    }


);
module.exports = Locations;
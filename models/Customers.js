const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");


class Customers extends Model{
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Customers.init(
    {
        id:
        {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [4]
            }
        },
        email:
        {
            type: DataTypes.STRING,
            validate:{
                isEmail:true
            }
        },
        phone:
        {
            type:DataTypes.STRING
        },
        address_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'addresses',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
      
            // async beforeUpdate(updatedUserData) {
            //   updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            //   return updatedUserData;
            // }
          },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'customers'
    }


);
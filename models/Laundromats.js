const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");


class Laundromats extends Model{
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
Laundromats.init(
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
            unique:true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [6]
            }
        },
        email:
        {
            type: DataTypes.STRING,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        phone:
        {
            type:DataTypes.STRING
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'laundromats'
    }


);


module.exports = Laundromats;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'laundromats'
    }


);
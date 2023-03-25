const { Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');
const Comment = require('./Comment');

class Post extends Model {}

Post.init(
    {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    title: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    content: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('NOW()'),
    },
    updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('NOW()'),
    },
    user_id: {
    type: DataTypes.INTEGER,
    references: {
    model: 'user',
    key: 'id',
        }
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    },
    
);


// define association between Post and Comment models
Post.hasMany(require('./Comment'), {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });


module.exports = Post;
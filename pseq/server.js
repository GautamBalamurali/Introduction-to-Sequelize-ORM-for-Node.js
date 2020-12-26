const express = require('express');
const { Sequelize, UUIDV4 } = require('sequelize');
const sequelize = require('sequelize');

const app = express();
const port = 4000;

const connection = new Sequelize('db','user','pass',{
    host:'localhost',
    dialect:'sqlite',
    storage:'db.sqlite',
    operatorsAliases:false,
    define:{
        freezeTableName: true
    }
});

const User = connection.define('User',{
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    first: Sequelize.STRING,
    last: Sequelize.STRING,
    full_name: Sequelize.STRING,
    bio: Sequelize.TEXT},
    {
        hooks: {
            beforeValidate: () => {
                console.log('before validate');
            },
            afterValidate: () => {
                console.log('after validate');
            },
            beforeCreate: (user) => {
                user.full_name = `${user.first} ${user.last}`;
                console.log('before create');
            },
            afterCreate: () => {
                console.log('after create');
            },
        }
});

connection.sync({
    logging: console.log,
    force: true
}).then(() => {
    User.create({
        first: 'Joe',
        last: 'Smith',
        bio: 'New bio entry'
    })
}).then(() => {
    console.log('Connection to database successfully established.');
}).catch(err => {
    console.error('Unable to connect to database',err);
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});
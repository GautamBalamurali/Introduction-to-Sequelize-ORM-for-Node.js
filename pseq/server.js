const express = require('express');
const { Sequelize, UUIDV4 } = require('sequelize');
const sequelize = require('sequelize');

const app = express();
const port = 4000;

const connection = new Sequelize('db','user','pass',{
    host:'localhost',
    dialect:'sqlite',
    storage:'db.sqlite',
    operatorsAliases:false
});

const User = connection.define('User',{
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: Sequelize.STRING,
    bio: Sequelize.TEXT
});

connection.sync({
    logging: console.log,
    force: true
}).then(() => {
    User.create({
        name: 'Joe',
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
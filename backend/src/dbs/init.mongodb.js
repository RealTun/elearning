'use strict'

const { default: mongoose } = require("mongoose")
const { db: {host, name, port} } = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`
// console.log(connectString)
const { countConnect } = require('../helpers/check.connect')

// console.log(connectString);


class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if(true){
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true});
        }

        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(_ => console.log('Connected Mongodb Success', countConnect()))
            .catch(err => console.log('Error Connect'))
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
/**
 * db pass myAdmin1 user myAdmin
 * collection todos
 * URL mongodb://<dbuser>:<dbpassword>@ds147225.mlab.com:47225/testapp
 * 
 */
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "testapp";
const user = "myAdmin";
const pass = "myAdmin1";
const url = `mongodb://${user}:${pass}@ds147225.mlab.com:47225/testapp`;
const mongoOptions = {useNewUrlParser : true};

const state = {
    db: null
};

const connect = (cb) =>{
    if(state.db)
    cb();
    else{
        MongoClient.connect(url, MongoClient,(err, client)=>{
            if(err)
            cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}
const getDB = ()=>{
    return  state.db;
}

module.exports ={getDB,connect,getPrimaryKey};
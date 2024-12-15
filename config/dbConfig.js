const mongoose = require('mongoose');

// connecting to mongoDB Cloud 
async function mongodbConnect (){
    try{
        await mongoose.connect(process.env.URI , {dbName:'BeboStore_mongoDB'});
        console.log("Connection Succeded to MongoDB .. Done")

    }catch{
        console.log("Connection Failed to MongoDB")
    }
}

module.exports = {mongodbConnect}
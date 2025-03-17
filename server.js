const app = require('./app')
const {mongodbConnect} = require('./config/dbConfig')

mongodbConnect(); // connect to mongoDB server

// run the server
app.listen(process.env.PORT || 7000 , (err)=>{
    if(err){
        console.log("Problem Running the Server" , err);
    }
    console.log (`Server is Running on port: ${process.env.PORT || 5000}`)
})

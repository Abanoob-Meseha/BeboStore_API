const app = require('./app')
const {mongodbConnect} = require('./config/dbConfig')

mongodbConnect();

app.listen(process.env.PORT , (err)=>{
    if(err){
        console.log("Problem Running the Server" , err);
        return
    }
    console.log (`Server is Running on port: ${process.env.PORT}`)
})

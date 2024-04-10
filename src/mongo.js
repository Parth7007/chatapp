const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb Connected")
})
.catch(()=>{
    console.log("Monogdb Not Connected")
})

const loginSchema = new mongoose.Schema({

    username:{
        type:String,
        require:true
    },


    password:{
        type:String,
        require:true
    },


    confirmpassword:{
        type:String,
        require:true
    }
})

const collection = new mongoose.model("SignupCollection", loginSchema)

module.exports = collection
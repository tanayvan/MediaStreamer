var mongoose= require('mongoose')
var crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');
var userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    encry_password:{
        type:String,
       required:true
    }
    
},{timestamps:true})

userSchema.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidv4()
    this.encry_password=this.securePassword(password)
})
.get(function(){
    return this._password
})


userSchema.methods={
    securePassword(plainPassword){
        if(!plainPassword) return "";
        try{
            return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
        }
        catch(err)
        {
            console.log(err)
            return ""
        }
    },
    authenticate:function(plainPassword){
        return this.securePassword(plainPassword)=== this.encry_password
    }
}

module.exports=mongoose.model("User",userSchema)
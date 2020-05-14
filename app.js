var express= require('express')
var mongoose= require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
var app = express()


//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

//routes
const authRoutes=require('./routes/auth')

app.use('/api',authRoutes)



mongoose.connect("mongodb://localhost:27017/mediaStreaming",{useNewUrlParser:true,useUnifiedTopology: true ,useCreateIndex:true} ).then(() => {
    console.log('databse connected')
}).catch(() => {
    console.log('error  connecting to  database')
})


app.listen(4000,() => {
    console.log('server has started')
})






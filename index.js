const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoute = require('./routes/Users')
const userAuth = require('./routes/Auth')
const userPosts = require('./routes/Posts')

const app = express()
dotenv.config();
mongoose.connect(process.env.MONGO_URL , ()=> {
    console.log("Connected to MongoDb")
});

app.use(express.json());

app.use('/api/users' , userRoute)
app.use('/api/auth' , userAuth)
app.use('/api/posts' , userPosts)


app.listen(3000 , ()=> {
    console.log("Server up and running at port 3000")
})
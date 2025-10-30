const express=require('express');
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
const UserRouter=require('./router/UserRouter.js');
const PostRoutes = require('./router/postRoutes.js');
const authRoutes=require('./router/authRoutes.js')
const {errorHandler} = require("./Middleware/errorhandler.js");

require('dotenv').config();
const app=express();
const port=3001;

app.use(cors());
app.use(errorHandler);
app.use(express.json());


const uri=process.env.Database_uri;

mongoose.connect(uri)
.then(()=>console.log("MongoDB connected successfully!"))
.catch(err=>console.log("Error in connecting to mongoDB:",err))



// app.use('/api/users',UserRouter)
app.use('/api/Posts',PostRoutes)
app.use('/api/auth',authRoutes);
app.use('/uploads',express.static(path.join(__dirname,'uploads')));


app.listen(port,()=> {
  console.log(`Backend server is running at http://localhost:${port}`)
})

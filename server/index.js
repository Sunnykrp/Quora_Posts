const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const path=require('path');
const authRoutes=require('./routes/authRoutes.js');
const cors = require('cors');

dotenv.config();
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174', // Adjust this to your client URL
    credentials: true, // Allow cookies to be sent with requests
}));

app.use('/api/auth', authRoutes);
const PORT=process.env.PORT||3000;
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
});
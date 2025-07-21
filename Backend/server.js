const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();


const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

const bookRoutes = require("./routes/bookRoute");
const reviewRoutes = require("./routes/reviewRoute");



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB is Connected...");
},
(err)=>{
    console.log("Something went wrong",err);
});

const app = express();
PORT = 3000;


app.use(express.json());
app.use(cors());
 
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);




app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
});  
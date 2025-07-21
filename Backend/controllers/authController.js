const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req,res) =>{
    try{
    const {name,email,password,role}= req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        name,
        email, 
        password:hashPassword, 
        role,
    })
    await newUser.save();
    res.status(201).json({message: `User registered`});
    }catch(err){
    res.status(500).json({message: "Something is wrong"});
    }
};


const login =async (req,res) =>{
    try{
    const {email,password}= req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: `User with email not found`})  
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({message: `Invalid Credentials!`})  

    } 
     const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET, {expiresIn: "1d"});
            return res.status(200).json({ message: "User registered",token})  
 
    
    }catch(err){
            res.status(500).json({message: "Something is wrong"});

    }
};

module.exports = {
    register,login,
}

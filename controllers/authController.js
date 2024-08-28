const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');


const registerController = async (req,res) =>{
    try {
        const {userName,email,password,phone,address,answer} = req.body;
        //validation
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success : false,
                message : "Please provide all fields"
            })
        }

        // check user
        const existing = await userModel.findOne({email : email});
        if(existing){
            return res.status(500).send({
                success : false,
                message : "Email Already Registered please login"
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //Create User
        const user = await userModel.create({
            userName,
            email,
            password : hashedPassword,
            address,
            phone,
            answer
        })

        res.status(201).send({
            success : true,
            message : "Successfully Registered",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Resgister API",
            error
        })
    }
};


const loginController = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(500).send({
                success : false,
                message : "Please provide Email or Password"
            });
        }

        //Check User
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            });
        }
        //check user password 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).send({
                success : false,
                message : "Invalid Credentials"
            });
        }
        // Token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn : "7d"
        });


        res.status(200).send({
            success : true,
            message : "Login Successfully",
            token,
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Login API",
            error
        });
    }
};

module.exports = { registerController,loginController };
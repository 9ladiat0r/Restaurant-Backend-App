const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");



const getUserController = async (req,res) =>{
    try {
        // find user
        const user = await userModel.findById({_id : req.body.id});

        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            });
        }
        //hide password
        user.password = undefined;
        //response

        res.status(200).send({
            success : true,
            message : "User get Successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Get User API",
            error
        })
    }
};

const updateUserController = async (req,res) =>{
    try {
        //find user
        const user = await userModel.findById({_id : req.body.id});

        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            });
        }

        //Update
        const {userName, address, phone,} = req.body;
        if(userName) user.userName = userName;
        if(address) user.address = address;
        if(phone) user.phone = phone;

        await user.save();

        res.status(200).send({
            success : true,
            message : "User Update Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Update User API"
        })
    }
};

// update password 
const updatePasswordController = async (req,res) =>{
    try {
        const user = await userModel.findById({_id : req.body.id});
        // validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            });
        }

        //get data from user
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success : false,
                message : "Please provide Old and New Password both"
            });
        }

        // check user password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(500).send({
                success : false,
                message : "Invalid Old Password"
            });
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;

        await user.save();

        res.status(200).send({
            success : true,
            message : "Password Sucessfully Updated"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Update Password API"
        });
    }
};

// Reset Password
const resetPasswordController = async (req,res) =>{
    try {
        const {email,newPassword,answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success : false,
                message : "Please provide all fields"
            });
        }
        
        const user = await userModel.findOne({email,answer});

        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found or invalid answer"
            })
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;

        await user.save();

        res.status(200).send({
            success : true,
            message : "Password Reset Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Reset Password API",
            error
        });
    }
}

const deleteProfileController = async (req,res) =>{
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        return res.status(200).send({
            success : true,
            message : "Your account has been deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in delete profile API"
        });
    }
}

module.exports = { getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController };
const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController,} = require('../controllers/userContoller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//Routes
// GET USER || GET
router.get("/getUser",authMiddleware,getUserController);

//UPDATE PROFILE
router.put("/updateUser",authMiddleware,updateUserController);

//Password Update
router.post("/updatePassword",authMiddleware,updatePasswordController);

// Password Reset
router.post("/resetPassword", authMiddleware, resetPasswordController)

// Delete User
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController)




module.exports = router;
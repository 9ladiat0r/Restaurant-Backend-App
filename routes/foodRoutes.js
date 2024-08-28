const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController } = require('../controllers/foodController');


const router = express.Router();

// Routes
// Create Food Controller
router.post("/create",authMiddleware,createFoodController);

// Get All Food
router.get("/getAll",getAllFoodController);

// Get Single Food
router.get("/get/:id",getSingleFoodController);

// GET FOOD BY RESTAURANT
router.get("/getbyrestaurant/:id",getFoodByRestaurantController);

// UPDATE FOOD
router.put("/update/:id",authMiddleware,updateFoodController)

// DELETE FOOD
router.delete("/delete/:id",authMiddleware,deleteFoodController)
module.exports = router;
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantControlller, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantContoller');

const router = express.Router();

// Routes
// Create Restaurant || POST
router.post("/create",authMiddleware,createRestaurantController);

// Get all restaurant
router.get("/getAll",authMiddleware,getAllRestaurantControlller);

// Get by id
router.get("/get/:id",authMiddleware,getRestaurantByIdController);

// Delete
router.delete("/delete/:id",authMiddleware,deleteRestaurantController)



module.exports = router;
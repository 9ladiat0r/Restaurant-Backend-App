const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');

const router = express.Router();

// Routes
// Create Category
router.post("/create",authMiddleware,createCatController);

//get all
router.get("/getAll",getAllCatController);

// Update cat
router.put("/update/:id",authMiddleware,updateCatController);

// Delete Cat
router.delete("/delete/:id",authMiddleware,deleteCatController)
module.exports = router;
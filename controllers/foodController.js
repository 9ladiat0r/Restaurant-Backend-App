const foodModel = require("../models/foodsModel");

const createFoodController = async (req,res) => {
    try {
        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating} = req.body;

        if(!title || !description || !price || !restaurant){
            return res.status(500).send({
                success : false,
                message : "Please provide all necessary fields"
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        });

        await newFood.save();

        res.status(201).send({
            success : true,
            newFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in create food API"
        });
    }
}


const getAllFoodController = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success : false,
                message : "No Food Item was found"
            });
        }

        res.status(200).send({
            success : true,
            totalFoods : foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in get all food API"
        });
    }
}


const getSingleFoodController = async (req,res) => {
    try {
        const id = req.params.id;

        const food = await foodModel.findById(id);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No Food with that id"
            });
        }

        res.status(200).send({
            success : true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in get single food API"
        });
    }
}


const getFoodByRestaurantController = async (req,res) => {
    try {
        const restaurantid = req.params.id;

        const foods = await foodModel.find({restaurant : restaurantid});
        if(!foods){
            return res.status(404).send({
                success : false,
                message : "No Food with that id"
            });
        }

        res.status(200).send({
            success : true,
            message : "Food Base on Restaurant",
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in get food by restaurant API"
        });
    }
}


const updateFoodController = async (req,res) => {
    try {
        const id = req.params.id;
        
        const food = await foodModel.findById(id);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "Invalid Food ID"
            });
        }

        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating} = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(id,{
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        },{new : true});

        res.status(200).send({
            success : true,
            message : "Food Item updated Succesfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in update food API"
        });
    }
}


const deleteFoodController = async (req,res) => {
    try {
        const id = req.params.id;
        const food = await foodModel.findById(id);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No Food with this id"
            });
        }
        
        await foodModel.findByIdAndDelete(id);

        res.status(200).send({
            success : true,
            message : "Food Item deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in delete food API"
        });
    }
}


module.exports = { createFoodController,getAllFoodController,getSingleFoodController,getFoodByRestaurantController,updateFoodController,deleteFoodController };
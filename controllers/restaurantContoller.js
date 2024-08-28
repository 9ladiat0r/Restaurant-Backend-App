// Create Restaurant
const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async(req,res) =>{
    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;

        if(!title || !coords){
            return res.status(500).send({
                success : false,
                message : "Please provide title and coords both"
            });
        }
        const restaurant = await restaurantModel.findOne({title : title});
        if(restaurant){
            return res.status(500).send({
                success : false,
                message : "Error in Creating new Restaurant, Resource already present"
            });
        }
        const newRestaurant = new restaurantModel({
            title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords
        });

        await newRestaurant.save();

        res.status(201).send({
            success : true,
            message : "New Restaurant Created Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Create Restaurant API"
        });
    }
}

const getAllRestaurantControlller = async (req,res) =>{
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants){
            return res.status(404).send({
                success : false,
                message : "No Restaurant Available"
            });
        }

        res.status(200).send({
            success : true,
            totalCount : restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Get All Restaurants API"
        });
    }
}


const getRestaurantByIdController = async (req,res) =>{
    try {
        const id = req.params.id;
        // Find Restaurant
        const restaurant = await restaurantModel.findById(id);

        if(!restaurant){
            return res.status(404).send({
                success : false,
                message : "Restaurant Not Found"
            });
        }

        res.status(200).send({
            success : true,
            restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Get Restaurant By Id API",
            error
        });
    }
}



const deleteRestaurantController = async (req,res) =>{
    try {
        const id = req.params.id;
        
        const restaurant = await restaurantModel.findById(id);

        if(!restaurant){
            return res.status(404).send({
                success : false,
                message : "Restaurant Not Found",
            });
        }

        await restaurantModel.findByIdAndDelete(id);
        res.status(200).send({
            success : true,
            message : "Restaurant deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in delete Restaurant API",
            error
        });
    }
}



module.exports = { createRestaurantController,getAllRestaurantControlller,getRestaurantByIdController,deleteRestaurantController }
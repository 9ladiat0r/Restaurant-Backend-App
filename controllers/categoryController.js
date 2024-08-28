const categoryModel = require("../models/categoryModel");

const createCatController = async (req,res) =>{
    try {
        const {title, imageUrl} = req.body;
        if(!title){
            return res.status(500).send({
                success : false,
                message : "Please provide Title of Category"
            });
        }

        const newCategory = new categoryModel({title,imageUrl});

        await newCategory.save();

        res.status(201).send({
            success : true,
            message : "Category created successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in create Category API",
            error
        });
    }
};


const getAllCatController = async (req,res) =>{
    try {
        const categories = await categoryModel.find({});

        if(!categories){
            return res.status(404).send({
                success : false,
                message : "No Category Found"
            })
        }

        res.status(200).send({
            success : true,
            totalCat : categories.length,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in get all categories API",
            error
        });
    }
}


const updateCatController = async (req,res) => {
    try {
        const id = req.params.id;
        const {title,imageUrl} = req.body;
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(404).send({
                success : false,
                message : "Category not found with that id"
            });
        }
        if(!title){
            return res.status(500).send({
                success : false,
                message : "Title is required"
            });
        }
        await categoryModel.findByIdAndUpdate(id,{ title,imageUrl},{new : true});

        res.status(200).send({
            success : true,
            message : "Category Updated Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in update category API"
        });
    }
}


const deleteCatController = async (req,res) => {
    try {
        const id = req.params.id;

        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(404).send({
                success : false,
                message : "No Category found with that id"
            });
        }

        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success : true,
            message : "Category deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in delete category API"
        });
    }
}


module.exports = { createCatController,getAllCatController,updateCatController,deleteCatController }
import category from "../models/category.model.js"    


export const createCategory = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                message: "category name is required",
                error: error.message
            })
        }
        const category = await category.create({
            name
        })
        return res.status(201).json({
            message: "category created successfully",
            category
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const updateCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                message: "category name is required",
                error: error.message
            })
        }
        const category = await category.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({
            message: "category updated successfully",
            category
    })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const category = await category.findById(id)
        if(!category){
            res.status(404).json({
                message: "category not found"
            })
        }
        await category.findByIdAndDelete(id)
        return res.status(200).json({
            message: "category deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}


export const getCategory = async(req,res)=>{
    try {
        const category = await category.find()
        return res.status(200).json({
            message: "category fetched successfully",
            category
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
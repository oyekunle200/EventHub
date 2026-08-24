import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banner: {
        type: String,
        required: true,
        trim: true
    },
    location: { 
        type: string,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true  
    },
    time: {
        type: string,
        required: true,
        trim: true
    },
    category: {
        type: string,
        required: true,
        
    },
    organizer: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        trim: true
    },
    capacity :{
        type: Number,
        required :true,
        min : 1 
    },
    availableTickets :{
        type:Number,
        required: true,
        min     : 0
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},{ timestamps: true})

const Event = mongoose.model("Event", eventSchema)
export default Event    

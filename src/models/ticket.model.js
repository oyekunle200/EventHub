import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    ticketType:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,  
        required: true, 
        min: 1
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    
},{ timestamps: true})

const Ticket = mongoose.model("Ticket", ticketSchema)
export default Ticket
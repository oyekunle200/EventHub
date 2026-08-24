import moongoose from "mongoose";

const paymentSchema = new moongoose.Schema({    
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    booking: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true  
    },  
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    reference: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending"
    },
    paymentDate: {
        type: Date,
        default: Date.now()
    }
},{ timestamps: true})

const Payment = moongoose.model("Payment", paymentSchema)
export default Payment
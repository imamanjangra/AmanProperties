import mongoose , {Schema} from "mongoose";

const contactformSchema = new Schema({
    firstName : {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
    },
    mobileNo : {
        type : Number,
        required : true
    },
    purpose: {
        type: String,
        enum : ["Buy" , "Sell"],
        required : true,
    },
    propertype : {
        type : String,
        enum : ["Plot" , "Home" , "Floor"],
        required : true
    }
} , {timestamps : true})

export const ContactForm = mongoose.model("ContactForm" , contactformSchema)
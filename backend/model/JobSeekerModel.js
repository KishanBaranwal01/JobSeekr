import mongoose, { Schema } from "mongoose";

const JobSchema=new Schema({
    name:{
        type:String
    },
    skills:{
        type:[String]
    },
    experience:{
        type:Number
    },
    location:{
        type:String
    },
    ctc:{
        type:Number
    },
    noticePeriod:{
        type:Number
    }
})

const UserModel=new mongoose.model("UserModel",JobSchema)
export default UserModel
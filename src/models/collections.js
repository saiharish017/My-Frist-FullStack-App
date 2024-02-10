import mongoose, { Mongoose } from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:["true", "Please provide a collection name"],
            trim: true,
            maxLength :[
                120, "collection name should not be more than 120 chars"
            ]
        }

    },
    {timestamps: true}
);
export default mongoose.model("collection", collectionSchema);

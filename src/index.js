import mongoose from "mongoose";
import app from "./app.js";

(async ()=>{
    try {
       await mongoose.connect("mongodb://localhost:27017/myfristapp");
       console.log('every this is fine');
       app.on('error', (error)=>{
        console.log("error", error);
        throw error;
       })
       const onListening =()=>{
        console.log("listening on the port 5000");

       }
       app.listen(5000, onListening)

        
    } catch (error) {
        console.error("Error", error)
        throw error
        
    }

})()
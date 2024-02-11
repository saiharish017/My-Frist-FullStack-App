import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("every this is fine");
    app.on("error", (error) => {
      console.log("error", error);
      throw error;
    });
    const onListening = () => {
      console.log("listening on the port 5000");
    };
    app.listen(config.PORT, onListening);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
})();

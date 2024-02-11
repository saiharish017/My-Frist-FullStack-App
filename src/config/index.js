import dotenv from "dotenv";

dotenv.config()
const config={
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || " mongodb://localhost:27017/myfristapp",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPITY: process.env.JWT_EXPITY

}
export default config
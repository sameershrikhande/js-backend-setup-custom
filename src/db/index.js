// Database Connection
// db > index.js

import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectBD = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n----- MongoDB Connected !! DB HOST: ${connectionInstance.connection.host} ----- \n`);
        // console.log(connectionInstance);
    } catch (error) {
        console.log("\n------------ MONGODB connection FAILED ------------ \n", error);
        process.exit(1)
    }
}

export default connectBD
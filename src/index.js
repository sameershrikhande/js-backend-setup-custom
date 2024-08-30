// MAIN FILE - index.js
import dotenv from "dotenv"
import connectBD from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectBD()
.then(() => {
    app.on("error", (error) => {
        console.log("Error :: Express", error);
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`----- Server is running at port : http://localhost:${process.env.PORT} ----- \n`);
    })
})
.catch((error) => {
    console.log("\n------------- MONGO db connection failed !!! ------------- \n", error);
})
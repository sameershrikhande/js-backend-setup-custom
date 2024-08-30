// app.js
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import logger from "./logger.js";
import morgan from "morgan";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
  
  

// routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

let coffeeData = []
let nextId=1

// add coffee
app.post("/coffee", (req, res) => {
    logger.info("Adding coffee")
    const {name, price} = req.body
    const newData = {
        id: nextId++,
        name,
        price
    }
    coffeeData.push(newData)
    res.send(newData)
    logger.warn("Added coffee")
})

// find coffee
app.get("/coffee/:id", (req, res) => {
    const coffee = coffeeData.find(c => c.id === parseInt(req.params.id))
    if (!coffee) {
        res.status(404).send("Coffee not found")
    } else {
        res.status(200).send(coffee)
    }
}) 

// update coffee
app.put("/coffee/:id", (req, res) => {
    const coffeeId = parseInt(req.params.id)
    const coffee = coffeeData.find(c => c.id === coffeeId)
    if (!coffee) {
        res.status(404).send("Coffee not found")
    } else {
        const {name, price} = req.body
        coffee.name = name
        coffee.price = price 
        res.status(200).send(coffee)
    }  
})


// delete coffee
app.delete("/coffee/:id", (req, res) => {
    const index = coffeeData.findIndex(c => c.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send("Coffee not found")
    } else {
        coffeeData.splice(index, 1)
        res.status(204).send("deleted")
    }
})

// get coffee data
app.get("/coffee", (req, res) => {
    res.send(coffeeData)
})


export { app }

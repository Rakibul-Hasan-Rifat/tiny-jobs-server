import express from "express";
import { configDotenv } from "dotenv";
import { client } from "./mongodb/mongdb.config.js";

configDotenv();

const app = express();
const port = process.env.PORT || 4321;

app.get('/', (_, res) => {
    res.send('The app is running')
})

app.listen(port, async () => {
    try {
        client.connect();
        console.log(`The app is running at http://localhost:${port}`);
    } catch (error) {
        console.log(error.message)
    }
})
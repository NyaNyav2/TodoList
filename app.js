require('dotenv').config();
require('express-async-errors');

const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path"); // Ensure path is imported
const connectDB = require("./db/connect");
const peopleRouter = require("./routes/people");

app.use(express.json());
app.use(cors());

app.use("/api/v1", peopleRouter);

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
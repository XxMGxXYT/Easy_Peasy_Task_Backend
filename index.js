const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const { connectDB } = require("./configs/dbConnection.js")
const PORT = process.env.PORT || 4350
const { date } = require("./logs/logFunc.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cors()) // CORS
app.use(express.static("public")) // Add the static middleware to serve static files from the "public" directory
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json
app.use(cookieParser()) // for parsing cookies
app.use(date) // Logs middleware

// // Routing always to the home page
// app.get(/^\/$/, (req, res) => {
//     res.redirect("/home")
// })

app.use(/\/home(.html)?/, require("./routes/homeRoute.js")) // Home route
app.use(/\/tasks/, require("./routes/tasksRoute")) // Tasks route

connectDB()

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});
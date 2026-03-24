const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: { type: String, required: true },
    snippet: { type: String },
    body: { type: String, required: true },
    taskStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model("Tasks", tasksSchema);
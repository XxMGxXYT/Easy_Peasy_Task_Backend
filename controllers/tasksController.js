const Tasks = require("../models/Tasks")

const addTasksHandler = async (req, res) => {
    let task = req.body
    console.log(task)
    if (!task.title || !task.body) return res.status(400).json({ success: false, message: "Missing data." }) // Bad request, data not found
    try {
        const response = await Tasks.create(task)
        console.log(response)
        if (response) {
            res.status(201).json({ success: true, data: response })
        } else {
            res.status(400).json({ success: false, message: "Data didn't fill correctly." })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ success: false, message: err.message })
    }
}

const getTasksHandler = async (req, res) => {
    try {
        const response = await Tasks.find().exec()
        console.log(response)
        if (response) {
            res.status(200).json({ success: true, data: response })
        } else {
            res.status(404).json({ success: false, message: "Data not found." })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ success: false, message: err.message })
    }
}

const updateTasksHandler = async (req, res) => {
    let taskId = req.params.id
    let updatedTask = req.body
    if (!taskId) return res.status(400).json({ success: false, message: "Missing data." }) // Bad request, data not found
    if (!updatedTask) return res.status(400).json({ success: false, message: "Missing data." }) // Bad request, data not found
    try {
        const response = await Tasks.findByIdAndUpdate(taskId, updatedTask, { new: true })
        console.log(response)
        if (response) {
            res.status(200).json({ success: true, data: response })
        } else {
            res.status(404).json({ success: false, message: "Task not found." })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ success: false, message: err.message })
    }
}

const deletetasksHandler = async (req, res) => {
    let taskId = req.params.id
    if (!taskId) return res.status(400).json({ success: false, message: "Missing data." }) // Bad request, data not found
    try {
        const response = await Tasks.findByIdAndDelete(taskId)
        console.log(response)
        if (response) {
            res.status(200).json({ success: true, message: "Task deleted successfuly." })
        } else {
            res.status(404).json({ success: false, message: "Task not found." })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { addTasksHandler, getTasksHandler, updateTasksHandler, deletetasksHandler }
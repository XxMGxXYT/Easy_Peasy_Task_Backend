const router = require("express").Router()
const { addTasksHandler, getTasksHandler, updateTasksHandler, deletetasksHandler } = require("../controllers/tasksController")

router.get("/", getTasksHandler)
    .post("/add-task", addTasksHandler)
    .put("/:id", updateTasksHandler)
    .delete("/:id", deletetasksHandler)

module.exports = router;
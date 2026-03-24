const path = require("path")
const fs = require("fs")
const fsPromises = require("fs").promises
const { v4: uuid } = require("uuid")
const dfs = require("date-fns")

const date = async (req, res, next) => {
    const log = `ID: ${uuid()}, Date: ${dfs.format(new Date(), "yyyy/MM/dd - hh:mm:ss")}, ${req.headers.origin}, ${req.method}\n`
    if (fs.existsSync((path.join(__dirname, "./logsFile.txt")))) {
        await fsPromises.appendFile((path.join(__dirname, "./logsFile.txt")), log, (err) => {
            if (err) {
                console.error(err.message)
            }
        })
    } else {
        await fsPromises.writeFile((path.join(__dirname, "./logsFile.txt")), log, (err) => {
            if (err) {
                console.error(err.message)
            }
        })
    }
    console.log(`ID: ${uuid()}, Date: ${dfs.format(new Date(), "yyyy/MM/dd - hh:mm:ss")}, ${req.headers.origin}, ${req.method}`)
    next()
}

module.exports = { date }
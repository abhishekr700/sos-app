const express = require("express")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
const fs = require("fs")
const path = require("path")
const morgan = require("morgan")

const DATA_FILE_PATH = path.join(__dirname, "../data.txt")
const ENV_FILE_PATH = path.join(__dirname, "../.env")

dotenv.config({
    path: ENV_FILE_PATH
})

const PORT = process.env.PORT
const PASS_HASH = process.env.PASS_HASH


console.log({
    PORT, PASS_HASH
})

const data = fs.readFileSync(DATA_FILE_PATH).toString()

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use("/", express.static(__dirname + "/public_html"))

app.post("/emergencyData", async (req, res) => {
    console.log("/emergencyData", req.body);
    const { password } = req.body
    if (password === "" || password === null) {
        return res.sendStatus(400)
    }
    const hashCompareResult = await bcrypt.compare(password, PASS_HASH)
    console.log({ password, hashCompareResult });

    if (hashCompareResult) {
        return res.send(data)
    }

    res.send("Work in progress")
})



app.listen(process.env.PORT, console.log(`Server started at port ${PORT}`))
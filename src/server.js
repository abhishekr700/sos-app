const express = require("express")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
const fs = require("fs")
dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT
const PASS_HASH = process.env.PASS_HASH

console.log(__dirname)

const data = fs.readFileSync("../data.txt").toString()

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use("/", express.static(__dirname + "/public_html"))

app.post("/emergencyData", async (req, res) => {
    const { password } = req.body
    const hashCompareResult = await bcrypt.compare(password, PASS_HASH)
    console.log({ password, hashCompareResult });

    if (hashCompareResult) {
        return res.send(data)
    }

    res.send("Work in progress")
})



app.listen(process.env.PORT, console.log(`Server started at port ${PORT}`))
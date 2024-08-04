const bcrypt = require("bcrypt")

const password = "myuniquepass"
const saltRounds = 10

bcrypt
    .hash(password, saltRounds)
    .then(hash => {
        console.log('Hash ', hash)
    })
    .catch(err => console.error(err.message))
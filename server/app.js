const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 3000


app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server running on PORT ${PORT}`)
})
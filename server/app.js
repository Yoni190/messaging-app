const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/index')


const app = express()
app.use(express.json())
app.use(cors())


app.use('/', routes.authRoute)
app.use('/users', routes.userRoute)
app.use('/messages', routes.messageRoute)


const PORT = process.env.PORT || 3000


app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server running on PORT ${PORT}`)
})
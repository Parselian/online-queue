const express = require("express")
const userRouter = require("./routes/user.routes")
const sessionRouter = require("./routes/session.routes")
const queueRouter = require("./routes/queue.routes")
const PORT = process.env.PORT || 8080
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', sessionRouter)
app.use('/api', queueRouter)

app.listen(PORT, () => {
  console.log(`server started at ${PORT} port`)
})
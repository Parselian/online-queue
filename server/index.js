const express = require("express")
const userRouter = require("./routes/user.routes")
const PORT = process.env.PORT || 8080
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.log(`server started at ${PORT} port`)
})
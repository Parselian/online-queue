const express = require("express")
const userRouter = require("./routes/user.routes")
const sessionRouter = require("./routes/session.routes")
const queueRouter = require("./routes/queue.routes")
const PORT = 3000 //process.env.PORT || 8080
const cors = require('cors')

const http = require('http')
const fs = require('fs')
// const https = require('node:https')
// const privateKey  = fs.readFileSync('/etc/letsencrypt/live/parseliandev.ru/privkey.pem', 'utf8')
// const certificate = fs.readFileSync('/etc/letsencrypt/live/parseliandev.ru/fullchain.pem', 'utf8')
// const credentials = {key: privateKey, cert: certificate}

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', sessionRouter)
app.use('/api', queueRouter)

app.get('/test', (req, res) => {
  res.send('Hello dev.to!');
});

 const httpServer = http.createServer(app);
//  const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
// httpsServer.listen(8443);

//app.listen(3000, () => {
  //console.log(`server started at ${PORT} port`)
//})
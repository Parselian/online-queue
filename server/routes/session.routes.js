const Router = require("express")
const router = new Router()
const SessionController = require("../controller/session.controller")

router.post('/create-session', SessionController.createSession)
router.get('/sessions', SessionController.getSessions)
router.get('/get-session', SessionController.getSingleSession)
router.delete('/delete-session', SessionController.deleteSession)

module.exports = router
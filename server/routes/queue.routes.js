const Router = require("express")
const router = new Router()
const QueueController = require("../controller/queue.controller")

router.post('/create-ticket', QueueController.createTicket)
router.get('/get-single-ticket', QueueController.getSingleTicket)


module.exports = router
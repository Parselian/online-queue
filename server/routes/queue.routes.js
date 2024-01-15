const Router = require("express")
const router = new Router()
const QueueController = require("../controller/queue.controller")

router.post('/create-ticket', QueueController.createTicket)
router.get('/get-single-ticket', QueueController.getSingleTicket)
router.get('/get-next-order-ticket', QueueController.getNextOrderTicket)
router.get('/get-queue-tickets', QueueController.getQueueTickets)
router.put('/close-ticket', QueueController.closeTicket)
router.delete('/clear-queue', QueueController.clearQueue)

module.exports = router
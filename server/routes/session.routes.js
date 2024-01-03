const Router = require("express")
const router = new Router()
const UserController = require("../controller/user.controller")

router.post('/create-session', UserController.createUser)
router.get('/sessions', UserController.getUsers)
router.get('/get-session', UserController.getSingleUser)
router.delete('/delete-session', UserController.deleteUser)

module.exports = router
const Router = require("express")
const router = new Router()
const UserController = require("../controller/user.controller")

router.post('/user', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/login', UserController.getSingleUser)
router.put('/user', UserController.updateUser)
router.put('/update-password', UserController.updatePassword)
router.delete('/user/:login', UserController.deleteUser)

module.exports = router
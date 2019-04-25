const router = require('express').Router()
const controller = require('../controllers/userController')
const apodController = require('../controllers/apodController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// register a user
router.post('/register', controller.userRegister)

// login manual a user
router.post('/login', controller.userLogin)

// verify token
router.get('/verify', authentication, (req, res) => {
  res.status(200).json({
    message: 'User is verified',
    id: req.userData.id,
    email: req.userData.email,
  })
})

// get apods
router.get('/apods', authentication, apodController.getApods)

// get apods by id
router.get('/apods/:id', authentication, apodController.getApodsById)

// save apods 
router.post('/apods', authentication, apodController.saveApods)

// delete apods 
router.delete('/apods/:id', authentication, authorization, apodController.deleteApods)

// update apods
router.put('/apods/:id', authentication, authorization, apodController.updateData)

module.exports = router
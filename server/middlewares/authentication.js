const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('accesstoken')) {
    try {
      var decoded = jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET)
      req.userData = decoded
      next()
    } catch(err) {
      res.status(400).json({
        message: 'INVALID TOKEN'
      })
    }
  } else {
    res.status(400).json({
      message: 'PLEASE LOGIN AND GET TOKEN'
    })
  }
}
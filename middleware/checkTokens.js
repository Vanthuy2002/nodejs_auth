const { verifyToken } = require('../utils')

const checkValidToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const tokens = authHeader?.split(' ')[1]
  if (!tokens)
    return res.status(401).json({ message: 'You are not login', status: 401 })
  await verifyToken(tokens)
    .then((decoded) => {
      req.currentUser = decoded.email
      return next()
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
}

module.exports = checkValidToken

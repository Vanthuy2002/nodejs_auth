const { verifyToken } = require('../utils')
const checkToken = async (req, res, next) => {
  const tokens = req.headers['authorization'].split(' ')[1]
  if (!tokens)
    return res.status(401).json({ message: 'You are not login', status: 401 })
  const decoded = await verifyToken(tokens)
  req.currentUser = decoded.email
  next()
}

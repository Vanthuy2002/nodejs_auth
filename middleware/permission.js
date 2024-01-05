const permissionAction = (...allowRoles) => {
  return (req, res, next) => {
    if (!req?.currentUser.roles)
      return res
        .status(401)
        .json({ message: 'Not found use, please login', status: 401 })

    const roles = req.currentUser.roles
    const canAccess = roles
      .map((role) => allowRoles.includes(role))
      .find((val) => val === true)
    if (!canAccess)
      return res.status(403).json({ message: 'Permission denined' })

    return next()
  }
}

module.exports = permissionAction

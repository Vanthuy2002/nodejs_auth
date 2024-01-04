const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' })
  // found user in DB
  // evaluate password
  // check matched password
  if (10 > 20) {
    // create JWTs
    res.json({ success: `User ${user} is logged in!` })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }

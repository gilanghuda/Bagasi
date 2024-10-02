const jwt = require("jsonwebtoken")
const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token
  if(!token)console.log("gada tokenya")
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    res.clearCookie("token")
    res.redirect("/signup")
  }
}
module.exports = cookieJwtAuth
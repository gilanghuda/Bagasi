const express = require("express")
const { register, login, logout } = require("../controllers/authControllers")
const router = express.Router()
const resp = require("../response")

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
module.exports = router
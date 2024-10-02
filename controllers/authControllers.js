const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const userSchema = require("../schemas/userSchema")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const resp = require("../response")
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions")

const generateAccessToken = (userid) => {
  return jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const register = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    resp(401, "", "email or password field cant be empty", res)
    return
  }
  if (!validator.isEmail(email)){
    resp(401, "", "invalid email", res)
    return
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = {
    userid: uuidv4(),
    email,
    password: hashedPassword,
  }
  try {
    await createTable(userSchema)
    const userAlreadyExists = await checkRecordExists("users", "email", email)
    if (userAlreadyExists) {
      resp(409, "", "user already exist", res)
    } else {
      await insertRecord("users", user)
      resp(201, user, "user created succesfully", res)
    }
  } catch (error) {
    resp(500, "", error, res)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    resp(401, "", "email or password field cant be empty", res)
    return
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email)

    if (existingUser) {
      if (!existingUser.password) {
        resp(401, "", "invalid credentials", res)
        return
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      )

      if (passwordMatch) {
        res.cookie("token", generateAccessToken(existingUser.userid))
        res.status(200).json({
          userid: existingUser.userid,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.userid),
        })
      } else {
        resp(401, "", "wrong password", res)
      }
    } else {
      resp(401, "", "email not registered", res)
    }
  } catch (error) {
    resp(500, "", error, res)
  }
}

const logout = async  (req, res)=>{
  try {
      res.clearCookie("token")
      res.redirect("/login")
  } catch (error) {
      resp(400, "nothing", "gagal bang", res)
  }
}

module.exports = {
  register,
  login,
  logout,
}
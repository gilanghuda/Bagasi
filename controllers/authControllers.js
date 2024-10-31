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

//untuk generate jwt token yang nantinya disimpan di browser client sebagai cookies
const generateAccessToken = (userid) => {
  return jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const register = async (req, res) => {
  const { email, password, nama, alamat, tanggal_lahir } = req.body //mengambil body request api
  if (!email || !password) {
    resp(401, "", "email or password field cant be empty", res)
    return
  }
  if (!validator.isEmail(email)){
    resp(401, "", "invalid email", res)
    return
  }
  const salt = await bcrypt.genSalt(10) //menambahkan fungsi salt untuk menambahkan keamanan token
  const hashedPassword = await bcrypt.hash(password, salt) //hashing password user sebelum disimpan ke database
  const user = {
    userid: uuidv4(),
    email,
    password: hashedPassword,
    nama,
    alamat,
    tanggal_lahir,
  }
  try {
    await createTable(userSchema) //create tabel jika tabel belum ada
    const userAlreadyExists = await checkRecordExists("users", "email", email) //check database apakah user udah terdaftar atau belum
    if (userAlreadyExists) {
      resp(409, "", "user already exist", res) //ketika user telah terdaftar, user tidak dapat ditambahkan
    } else {
      await insertRecord("users", user) //menambahkan user ketika user belum ada di database
      resp(201, user, "user created succesfully", res)
    }
  } catch (error) {
    resp(500, "", error, res)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body //mengambil body request api
  if (!email || !password) {
    resp(401, "", "email or password field cant be empty", res)
    return //method berhenti ketika email atau password empty
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email) //memeriksa apakah user dengan email tertentu exist di database

    if (existingUser) {
      if (!existingUser.password) {
        resp(401, "", "invalid credentials", res)//ketika user tersedia namun password tidak ada, kode berhenti
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
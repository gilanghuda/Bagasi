const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const connectDB = require("./db/connectDB")
const port = process.env.PORT
const authRoutes = require("./routes/authRoutes")
const {createTable, 
  displayRecord,
  insertRecord,
  findNearestUnggahan,
  postUnggahan,
  userIsActive,
  updateUser,
  updateUserPict,
  pool,
  } = require("./utils/sqlFunctions")
const cookiesParser = require("cookie-parser")
const cookieJwtAuth = require("./middleware/cookieJwtAuth")
const multer = require("multer")
const jwt = require("jsonwebtoken")
const path = require("path")
const { v4: uuidv4 } = require("uuid")
const resp = require("./response")
const childSchema = require("./schemas/childSchema")

// customize nama file foto yang user post menjadi uuid nya dan placement di folder uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image")
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookiesParser())
app.use("/", authRoutes)
app.use(express.static(path.join(__dirname, 'public'), {extensions: ['html']}))

connectDB()

app.get('/userInfo', cookieJwtAuth, (req, res)=>{
  const user = req.user
  if (!user){
    resp(401, "there is no user", "no token", res)
  }
  displayRecord('users', user.userid, res)
})
app.get('/otherUserInfo', cookieJwtAuth, (req, res)=>{
  const user = req.query.user
  if (!user){
    resp(401, "there is no user", "no token", res)
  }
  displayRecord('users', user, res)
})

app.get('/unggahanInfo', cookieJwtAuth, (req, res)=>{
  const user = req.user
  displayRecord('unggahan', user.userid, res)
})

app.get('/childInfo', cookieJwtAuth, (req, res)=>{
  const user = req.user
  displayRecord('anak', user.userid, res)
})

app.post('/userUpdate', (req, res)=>{
  const token = req.cookies.token
    if (!token) {
      console.log ("there is no token")
      return
    }
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const {nama, email, alamat, tanggalLahir, noWa, bank, noRek} = req.body
    try {
      updateUser(user.userid, nama, email, alamat, tanggalLahir, noWa, bank, noRek)
      resp(201, "good", "update succes", res)
    } catch (error) {
      resp(401, "eror", error, res)
    }
})

// api untuk menyimpan foto user ke folder uploads
app.post('/profilepict', cookieJwtAuth, upload.single('avatar'), async (req, res)=>{
  await updateUserPict(req.user.userid, req.file.filename)
  res.json(req.file)
})

//api untuk menambahkan anak dari user ke database
app.post('/userChildren', async (req, res)=>{
  const token = req.cookies.token
    if (!token) {
      console.log ("there is no token")
      return
    }
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const {nama, tanggal_lahir} = req.body
    const parent_uuid = user.userid
    const children = {
      uuid: uuidv4(),
      parent_uuid,
      nama,
      tanggal_lahir,
    }
    console.log(children)
    try {
      // console.log(childSchema)
      // await createTable(childSchema)
      insertRecord("anak", children)
      resp(200, children, `insert children succes = ${parent_uuid}`, res)
    } catch (error) {
      console.log(error)
      resp(401, error, error, res)
    }
})

// api mencari postingan user terdekat
// cth pakai '/findNearestUnggahan?lat=214&lng=321&lim=5'
app.get('/findNearestUnggahan', (req, res)=>{
  const latitude = req.query.lat
  const longtitude = req.query.lng
  const limit = req.query.lim
  try {
    findNearestUnggahan (longtitude, latitude, limit, res)
  } catch (error) {
    resp(401, error , "eror find nearest user", res)
  }
})

// app.get('/detailunggahan/:email', (req, res)=>{
//   const emailUser = req.params.userId
//   resp()
// })
app.get("/image/:userid", async (req, res) => {
  const { rows: [user] } = await pool.query("select profile from users where userid = $1", [req.params.userid])
  if (user?.profile) {
    return res.redirect("/image/" + user.profile)
  }
  return res.redirect("https://api.dicebear.com/9.x/personas/svg?seed=" + req.params.userid)
})
// api nge post unggahan
app.post('/postUnggahan', (req, res)=>{
    const token = req.cookies.token
    if (!token) {
      console.log ("there is no token")
      return
    }
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const {keterangan,longtitude, latitude} = req.body
  try {
    postUnggahan(user.userid, keterangan, longtitude, latitude, res)
  } catch (error) {
    resp(401, error, "error bg", res)
  }
})

// api untuk cek apakah user mengaktifkan bagi asi atau tidak
// contoh pakai '/isActive?act=1'(artinya user siap bagiin asinya)
// 'isActive?act=0'(artinya user tidak siap bagiin asinya) 
app.post('/isActive', (req, res)=>{
  const query = req.query.act 
  const token = req.cookies.token
    if (!token) {
      console.log ("there is no token")
      return
    }
    const user = jwt.verify(token, process.env.JWT_SECRET)
    try {
      userIsActive(user.userid, query)
      resp(200, `${user.userid} is updated`, "succes", res)
    } catch (error) {
      resp(401, error, "error bg", res)
    }
})


app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
})
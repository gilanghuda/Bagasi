const express =  require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const connectDB = require("./db/connectDB")
const port = process.env.PORT
const authRoutes = require("./routes/authRoutes")
const {displayRecord} = require("./utils/sqlFunctions")
const cookiesParser = require("cookie-parser")
const cookieJwtAuth = require("./middleware/cookieJwtAuth")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookiesParser())
app.use("/", authRoutes)
app.use(express.static('public', {extensions :['html']}))

connectDB()

app.get('/user', cookieJwtAuth, (req, res)=>{
  const user = req.user
  console.log(user)
  displayRecord('users', 'email', 'userid', user.userid, res, req.cookies)
})


app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
})
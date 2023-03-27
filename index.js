let express=require("express")
const { message } = require("statuses")
let {connection}=require("./models/Database")
let {router}=require("./Router/user.Router")
let {notesRouter}=require("./Router/Note.Router")
let {authenticate}=require("./middleware/authenticate.middleware")
let cors=require("cors")
require("dotenv").config()
let app=express()
app.use(cors())
app.use(express.json())
console.log("js")

app.get("/",(req,res)=>{
  res.send("HOME PAGE")
})


app.use("/users",router)

app.use(authenticate)
app.use("/notes",notesRouter)


app.listen(process.env.port, async()=>{
  try{
    await connection
   console.log("mongodb is connected")

  }catch(err){
      console.log({err:message})
  }

  console.log(`server is running on port ${process.env.port}`)
   
})
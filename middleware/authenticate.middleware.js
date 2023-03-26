const jwt = require("jsonwebtoken")
let express=require("express")
let app=express()
app.use(express.json())

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    //console.log(token)
    if (token) {
        const decoded = jwt.verify(token, "masai")
        if (decoded) {
           
            req.body.User_id=decoded.userId
           
          
          
            next()
        } else {
            res.send("Please Login")
        }
    } else {
        res.send("Please Login")
    }
}
module.exports = {
    authenticate
}
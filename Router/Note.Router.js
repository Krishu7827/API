const express = require("express")
const { noteModel } = require("../models/Note.model.js")
const notesRouter = express.Router()
let jwt=require("jsonwebtoken")
notesRouter.use(express.json())
console.log("ok")
notesRouter.get("/", async (req, res) => {
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
     if(decoded){
        
        let notes= await noteModel.find({"User_id":decoded.userId})
      
        res.send(notes)
     }else{
        res.send({"message":"Someting Wrong.."})
     }
})
notesRouter.post("/create", async (req, res) => {
 
    let payload = req.body
    let new_note = new noteModel(payload)
    await new_note.save()
    res.send({ "msg": "Note Created" })
})
notesRouter.patch("/update/:userId", async (req, res) => {
    const token=req.headers.authorization
    try{
        const decoded=jwt.verify(token,"masai")
        let userID=req.params.userId
      
        if(decoded.userId==userID){
         
            let payload = req.body
            await noteModel.updateOne({User_id:decoded.userId},payload )
            res.send({ "msg": `${userID} document is updated` })
        }else{
            res.send({"message":"User Is Not Same"})
        }
    }catch(err){
        res.status(400).send({message:err.message})
    }
   

    
})
notesRouter.delete("/delete/:userId", async (req, res) => {
    const token=req.headers.authorization
    try{
        const decoded=jwt.verify(token,"masai")
        let userID=req.params.userId
      
        if(decoded.userId==userID){
         
          
            await noteModel.deleteOne({User_id:decoded.userId})
            res.send({ "msg": `${userID} document is deleted` })
        }else{
            res.send({"message":"User Is Not Same"})
        }
    }catch(err){

        res.status(400).send({message:err.message})
    }
})
module.exports = {
    notesRouter
}

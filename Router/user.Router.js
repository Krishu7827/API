let express=require("express")
let {userModel}=require("../models/User.model")

let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
let fs=require("fs")

let router=express.Router()
router.use(express.json())

router.post("/register",async(req,res)=>{
  let {email,pass}=req.body

  try{
    bcrypt.hash(pass, 8, async (err, hash)=>{
    const user=new userModel({email,pass:hash})
    await user.save()
    res.send({message:"Register Succesfull!!"})
    });
    }catch(err){
    res.send({message:"Error in registering the user"})
    console.log(err)
   
    }
})

router.post("/login",async(req,res)=>{
  const {email,pass}=req.body
try{
const user=await userModel.findOne({email})
if(user){
bcrypt.compare(pass, user.pass, function(err, result) {
if(result){
const token = jwt.sign({ userId: user._id}, 'masai');

res.send({"msg":"Login Successfull","token":token})

} else {res.status(400).send("Wrong Credntials")}
});
} else {
res.status(400).send("Wrong Credntials")
}
} catch(err){
res.status(400).send("Something went wrong")
console.log(err)
}
})

  

////////////////update////////////////


router.patch("/update", async(req,res)=>{
     let token= req.headers.authorization
     try{
     let decoded= jwt.verify(token,"masai")
    
      let payload=req.body
     
     if(decoded && payload.email!==undefined && payload.pass==undefined){
         try{
            await userModel.updateOne({_id:decoded.userId},payload)

            res.send({"message":"Email Update Successfully!!!"})
         }catch(err){
             
          res.status(404).send({"message":"Sorry!! User Id Is Wrong"})
         }
     }else if(decoded && payload.email==undefined && payload.pass!==undefined){

      try{
      let  {pass}=payload.pass
        
      bcrypt.hash(pass, 8, async (err, hash)=>{
         await userModel.updateOne({_id:decoded.userId},{pass:hash})
        res.send({message:"Password Updated!!"})
        });

     }catch(err){
         
      res.status(404).send({"message":"Sorry!! User Id Is Wrong"})
     }
      
     }else if(decoded){
      try{
        let  {email,pass}=payload
          
        bcrypt.hash(pass, 8, async (err, hash)=>{
           await userModel.updateOne({_id:decoded.userId},{email,pass:hash})
          res.send({message:" User Updated Succesfully!!"})
          });
  
       }catch(err){
           
        res.status(404).send({"message":"Sorry!! User Id Is Wrong"})
       }
     }else{
        res.status(400).send({"message":err.message})
     }
    }catch(err){
      res.status(400).send({"message":"You are not logged"})
    }
   
})

/////////////delete//////////////

router.delete("/delete", async(req,res)=>{
    try{
      let token=req.headers.authorization
       let decoded=jwt.verify(token,"masai")

       await userModel.deleteOne({_id:decoded.userId})

       res.send({"message":"User Deleted"})
    }catch(err){

      res.status(400).send({"message":"You are not Logged"})
    }
})
console.log("ok")
 
  
  module.exports={router}
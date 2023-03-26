let mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    titile: String,
    note: String,
    category: String,
    author: String,
    User_id:String,
    email:String

},{
    versionKey:false
})

const noteModel=mongoose.model("note",noteSchema)

module.exports={noteModel}
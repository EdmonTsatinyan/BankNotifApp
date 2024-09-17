import mongoose, { Schema } from "mongoose";

const notifSchema = new mongoose.Schema({
    deviceID:{type:String, required:true},
    loanID:{type:mongoose.Schema.Types.ObjectId, ref: "loan"},
    url:{type:String},
    notificationText:{type:String},
    notificationTitle:{type:String}
})

const Notif =  mongoose.model("Notif", notifSchema)

export default Notif
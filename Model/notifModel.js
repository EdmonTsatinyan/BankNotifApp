import mongoose, { Schema } from "mongoose";

const notifSchema = new mongoose.Schema({
    deviceID:{type:mongoose.Schema.Types.ObjectId},
    loanID:{type:mongoose.Schema.Types.ObjectId, ref: "loan"},
    url:{type:String},
    notificationText:{type:String},
    notificationTitle:{type:String}
})

const Notif =  mongoose.model("Notif", notifSchema)

export default Notif
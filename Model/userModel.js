import mongoose from "mongoose"; 
 
 
const userSchema = new mongoose.Schema({ 
    deviceID:{type:String, required:true},
    firebaseToken: {type : String, required:true}, 
    loans:[{type:mongoose.Schema.Types.ObjectId, ref:"Loan"}] 
}) 
 
const User = mongoose.model("User", userSchema) 
 
const loanSchema = new mongoose.Schema({ 
    deviceID:{type:String, required: true}, 
    bankName:{type:String, required: true}, 
    amount:{type:Number,required:true}, 
    dueDate: { type: Date, required: true }, 
    endDate: { type: Date, required: true }, 
    description: { type: String}, 
    amountValute: { type: String, required: true }, 
    paidStatus: { type: Boolean, default: false },
    bankID: { type: String, },
    isEnded : {type: Boolean, default: false}
}) 
 
const Loan = mongoose.model("Loan", loanSchema) 
 
export{Loan,User}

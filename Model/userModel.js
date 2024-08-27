import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    phoneID:{type:String, required:true},
    loans:[{type:mongoose.Schema.Types.ObjectId, ref:"Loan"}]
})

const User = mongoose.model("User", userSchema)

const loanSchema = new mongoose.Schema({
    phoneID:{type:String, required: true},
    bankName:{type:String, required: true, enum:[ 'Ameriabank',
        'Ardshinbank',
        'Armeconombank',
        'Artsakhbank',
        'ACBA',
        'AraratBank',
        'Converse',
        'HSBC',
        'Inecobank',
        'IDBank',
        'Unibank',
        'Evocabank',
        'VTB',
        'Byblos Bank',
        'Mellat Bank',
        'HayBusinessBank']},
        amount:{type:Number,required:true},
        dueDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        info: { type: String},
        amountValute: { type: String, required: true },
        paidStatus: { type: Boolean, default: false }
})

const Loan = mongoose.model("Loan", loanSchema)

export{Loan,User}

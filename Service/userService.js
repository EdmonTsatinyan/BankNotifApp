import { Loan, User } from "../Model/userModel.js";
import mongoose from "mongoose";


function addOneMonth(dateString) {
  const date = new Date(dateString);


  date.setMonth(date.getMonth() + 1);


  if (date.getDate() < new Date(dateString).getDate()) {

      date.setDate(0);
  }

  return date.toISOString(); 
}

const userService = {
  getDeviceLoans: async (deviceID) => {
    if (deviceID) {
      const user = await User.findOne({ deviceID }).populate("loans");
      if (user) {
        const today = new Date();

        const daysDifference = (date1, date2) => {
          const timeDiff = date1.getTime() - date2.getTime();
          return Math.ceil(timeDiff / (1000 * 3600 * 24));
        };

        user.loans = user.loans.sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);

          const diffA = daysDifference(dateA, today);
          const diffB = daysDifference(dateB, today);

          if (diffA < 0 && diffB >= 0) return -1;
          if (diffA >= 0 && diffB < 0) return 1;

          return diffA - diffB;
        });

        const loanDates = user.loans.map((loan) => {
          const dueDate = new Date(loan.dueDate);
          const diff = daysDifference(dueDate, today);

          return `${diff} days`;
        });



        await user.save();

        if(user.loans.length  > 0){

          return {status: 200, user, hasLoans: true}
        }else{
          return {status: 200, user, hasLoans: false}
        }

      }else{
        return {status:404, message: "User Not Found Invalid deviceID"}
      }
    } else {
      return { status: 400, message: "Bad Request" };
    }
  },
  addLoan: async (deviceID,bankName,amount,dueDate,endDate,description,amountValute) => {
    if (deviceID, bankName, amount, dueDate, endDate, description, amountValute) {
     
      const user = await User.findOne({ deviceID });

      const newLoanData = {
        deviceID,
        bankName,
        amount,
        dueDate: new Date(dueDate),
        endDate: new Date(endDate),
        description,
        amountValute,
        paidStatus: false,
      };

      if (user) {
        
        const newLoan = new Loan(newLoanData);
    
       
        user.loans.push(newLoan._id);
        await Promise.all([user.save(),newLoan.save()])
        return { status: 200, message: "New Loan Created Successfully!" };
      } else {
        return {
          status: 404,
          message: "User with provided Phone ID not found",
        };
      }
    } else {
      return { status: 400, message: "Bad Request" };
    }
  },
  changeloan: async (
    loanID,
    bankName,
    amount,
    dueDate,
    endDate,
    description,
    amountValute
  ) => {
    if (loanID) {
      const updatedLoanData = {
        bankName: bankName,
        amount: amount,
        dueDate: dueDate,
        endDate: endDate,
        description: description,
        amountValute: amountValute,
      };

      const updatedLoan = await Loan.findByIdAndUpdate(
        loanID,
        { $set: updatedLoanData },
        { new: true }
      );
      if (updatedLoan) {
        return { status: 200, message: "Loan Updated Successfully" };
      } else {
        return { status: 400, message: "Failed to update Loan" };
      }
    } else {
      return { status: 400, message: "Bad Request" };
    }
  },
  changePaidStatus: async (loanID) => {
    if ((loanID)) {
      const findLoan = await Loan.findById(loanID)
      const newDueDate = addOneMonth(findLoan.dueDate);
      const updatedStatus = await Loan.findByIdAndUpdate(
        loanID,
        {  paidStatus: true, 
          dueDate: new Date(newDueDate) },
        { new: true }
      );

      if(updatedStatus.dueDate.toISOString().split('T')[0] === updatedStatus.endDate.toISOString().split('T')[0]){
        console.log("prcar brats");
      }

      if (updatedStatus) {
        return { status: 200, message: "Updated paidStatus successfully!" };
      } else {
        return { status: 400, message: "Failed to update PaidStatus" };
      }
    } else {
      return { status: 400, message: "Bad Request" };
    }
  },
};

export default userService;

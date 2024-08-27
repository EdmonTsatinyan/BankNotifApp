import { Loan, User } from "../Model/userModel.js";
import mongoose from "mongoose";

const userService = {
  addLoan: async (
    phoneID,
    bankName,
    amount,
    dueDate,
    endDate,
    info,
    amountValute
  ) => {
    if ((phoneID, bankName, amount, dueDate, endDate, info, amountValute)) {
      const user = await User.findOne({ phoneID });

      const newLoanData = {
        phoneID,
        bankName,
        amount,
        dueDate: new Date(dueDate),
        endDate: new Date(endDate),
        info,
        amountValute,
        paidStatus: false,
      };

      if (user) {
        const newLoan = await Loan.create(newLoanData);
        user.loans.push(newLoan._id);
        await user.save();
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
    info,
    amountValute
  ) => {
    if (loanID) {
      const updatedLoanData = {
        bankName: bankName,
        amount: amount,
        dueDate: dueDate,
        endDate: endDate,
        info: info,
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
  changePaidStatus: async (loanID, paidStatus) => {

    if(loanID,paidStatus){
      const updatedStatus = await Loan.findByIdAndUpdate(
        loanID,
        { $set: { paidStatus: paidStatus } },
        { new: true }
      );
      if (updatedStatus) {
        return { status: 200, message: "Updated paidStatus successfully!" };
      } else {
        return { status: 400, message: "Failed to update PaidStatus" };
      }
    }else{
      return {status:400, message: "Bad Request"}
    }
 
  },
};

export default userService;

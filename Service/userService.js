import Notif from "../Model/notifModel.js";
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
  addLoan: async (deviceID,bankName,amount,dueDate,endDate,description,amountValute,bankID) => {
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
        bankID: bankID? bankID : null
      };
     

      if (user) {
        
        const newLoan = new Loan(newLoanData);
    
       
        user.loans.push(newLoan._id);
        await newLoan.save()
        await user.save()
        console.log("serrvice-add ----------",newLoan);
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
    amountValute,
    bankID
  ) => {
    if (loanID) {
      const updatedLoanData = {
        bankName: bankName,
        amount: amount,
        dueDate: dueDate,
        endDate: endDate,
        description: description,
        amountValute: amountValute,
        bankID,
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
    if (loanID) {
      
      const findLoan = await Loan.findById(loanID)
      
      
      if(findLoan){
       const newDueDate = addOneMonth(findLoan.dueDate);

      if(findLoan.dueDate.toISOString().split('T')[0] >= findLoan.endDate.toISOString().split('T')[0]){
        const findUser = await User.findOne({deviceID: findLoan.deviceID})
        let findNotifs = await Notif.deleteMany({loanID: loanID})
        const deletedLoan = await Loan.findByIdAndDelete(loanID)


        if(deletedLoan && findUser){
            findUser.loans = findUser.loans.filter(loan => loan.toString() !== loanID.toString())
           
            await findUser.save()
       
            return { status: 200, message: `Դուք ամբողջությամբ վճարեցիք ${findLoan.bankName} վարկը`, success:true ,isEnded: true};
          
        }else{
          return { status: 400, message: "Failed to End Loan", success:false };
        }


      }else{
        if(findLoan.endDate.toISOString().split('T')[0] < new Date(newDueDate).toISOString().split('T')[0]){
          findLoan.isEnded = true
          await findLoan.save()
          return { status: 200, message: "Updated paidStatus successfully!", success:true, isEnded: false};
        }else{

          const updatedStatus = await Loan.findByIdAndUpdate(
            loanID,
            {  paidStatus: true, 
              dueDate: new Date(newDueDate) },
            { new: true }
          );
    
          
    
          if (updatedStatus) {
            findLoan.paidStatus = false
            
            await findLoan.save()
            
    
              return { status: 200, message: "Updated paidStatus successfully!", success:true, isEnded: false};
            
    
          } else {
            return { status: 400, message: "Failed to update PaidStatus", success:false };
          }
        }
      }
     }else{
      
      return { status: 404, message: "Loan Not Found",success:false  };
     }



    } else {
      return { status: 400, message: "Bad Request",success:false  };
    }
  },
  removeLoan: async (loanID) => {
    if(loanID){
      const findLoan = await Loan.findById(loanID)

      if(findLoan){
        const findUser = await User.findOne({deviceID: findLoan.deviceID})
        let findNotifs = await Notif.deleteMany({loanID: loanID})

        if(findUser){
          findUser.loans = findUser.loans.filter(loan => loan.toString() !== loanID.toString())
         
        
          await findUser.save()

       

          const removeLoan = await Loan.findByIdAndDelete(loanID)
          if(removeLoan){
            return { status: 200, message: "Loan Removed Successfully", success:true };
          }else{
            return { status: 400, message: "Failed to remove Loan", success:false };
          }
        }else{
          return { status: 404, message: "User Not Found", success:false  };
        }
      }else{
        return { status: 404, message: "Loan Not Found",success:false  };
      }
    }else{
      return { status: 400, message: "Bad Request",success:false  };
    }
  }
};

export default userService;

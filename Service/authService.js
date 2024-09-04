import { User } from "../Model/userModel.js";

const authService = {
  logIN: async (deviceID) => {
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
        
        console.log(loanDates);
        
        
        await user.save();
        

        return { status: 200, message: "Logged in successfully", user };
      } else {
        const newUser = new User({
          deviceID,
          loans: [],
        });

        await newUser.save();

        return { status: 200, message: "New User created!", user: newUser };
      }
    } else {
      return { status: 400, message: "Bad Request" };
    }
  },
};

export default authService;

import { User } from "../Model/userModel.js";

const authService = {
  logIN: async (phoneID) => {
    
    if(phoneID){
        const user = await User.findOne({ phoneID }).populate("loans");
      if (user) {
        
        const today = new Date().getDate();

        const dayDifference = (day1, day2) => {
          const diff = Math.abs(day1 - day2);
          return Math.min(diff, 30 - diff);
        };
        user.loans = user.loans.sort((a,b)=> {
          const dayA = new Date(a.dueDate).getDate();
          const dayB = new Date(b.dueDate).getDate();
        
          const diffA = dayDifference(today, dayA);
          const diffB = dayDifference(today, dayB);
        
          return diffA - diffB;
        })
        await user.save()
        

          return { status: 200, message: "Logged in successfully", user };
        
      } else {
            const newUser = new User({
                phoneID,
                loans:[]
            })

            await newUser.save()

            return{status:200, message:"New User created!", user: newUser}
      }
    }else{
        return {status: 400, message: "Bad Request"}
    }
    
  },
};

export default authService;

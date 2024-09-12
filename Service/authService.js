import { User } from "../Model/userModel.js";

const authService = {
  logIN: async (deviceID,firebaseToken) => {
    if (deviceID) {
      const user = await User.findOne({ deviceID }).populate("loans");
      if (user) {
        
        if(user.loans.length > 0){

          return { status: 200, message: "Logged in successfully", hasLoans :true, deviceID };
        }else{
          return { status: 200, message: "Logged in successfully", hasLoans :false , deviceID};
        }

      } else {
        const newUser = new User({
          deviceID,
          firebaseToken,
          loans: [],
        });

        await newUser.save();

        return { status: 200, message: "New User created!", deviceID, hasLoans: false };
      }
    } else {
      return { status: 400, message: "Bad Request" };
    }
  },
};

export default authService;

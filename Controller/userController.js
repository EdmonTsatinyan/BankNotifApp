import userService from "../Service/userService.js";

const userController = {
  getDeviceLoans : async(req,res)=>{
    try {
      const {deviceID} = req.params

      const data = await userService.getDeviceLoans(deviceID)

      if(data.status < 400){
        res.status(data.status).send({user:data.user, hasLoans:data.hasLoans})
      }else{
        res.status(data.status).send({message:data.message})
      }
      
    } catch (error) {
      console.error(error)
    }
  },
  addLoan: async (req, res) => {
    try {
     
      const {deviceID,bankName,amount,dueDate,endDate,description,amountValute} = req.body;
      console.log("controller-add ----------",req.body);
      const response = await userService.addLoan(
        deviceID,
        bankName,
        amount,
        dueDate,
        endDate,
        description,
        amountValute
      );
      res.status(response.status).send({message: response.message});
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  changeLoan: async (req, res) => {
    try {
      const {
        bankName,
        amount,
        dueDate,
        endDate,
        description,
        amountValute
      } = req.body;
      const loanID = req.params.loanID;
      const response = await userService.changeloan(
        loanID,
        bankName,
        amount,
        dueDate,
        endDate,
        description,
        amountValute
      );
      res.status(response.status).send({message: response.message});
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  changePaidStatus: async (req, res) => {
    try {
      const loanID = req.params.loanID;

      const response = await userService.changePaidStatus(loanID);

      if(response.status < 400){
        res.status(response.status).send({message: response.message, success: response.success, isEnded: response.isEnded})
      }else{
        res.status(response.status).send({message: response.message, success: response.success})
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  removeLoan : async(req,res)=>{
    try {
      const {loanID} = req.params

      const data = await userService.removeLoan(loanID)

  
        res.status(data.status).send({message:data.message, success: data.success})
      
    } catch (error) {
      console.error(error)
      res.status(500).send({message:"Internal Server Error"})
    }
  }
};

export default userController;

import userService from "../Service/userService.js";

const userController = {
  addLoan: async (req, res) => {
    try {
      const {
        phoneID,
        bankName,
        amount,
        dueDate,
        endDate,
        info,
        amountValute
      } = req.body;
      const response = await userService.addLoan(
        phoneID,
        bankName,
        amount,
        dueDate,
        endDate,
        info,
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
        info,
        amountValute
      } = req.body;
      const loanID = req.params.loanID;
      const response = await userService.changeloan(
        loanID,
        bankName,
        amount,
        dueDate,
        endDate,
        info,
        amountValute
      );
      res.status(response.status).send(response.message);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  changePaidStatus: async (req, res) => {
    try {
      const loanID = req.params.loanID;
      const { paidStatus } = req.body;

      const response = await userService.changePaidStatus(loanID, paidStatus);

      res.status(response.status).send(response.message);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

export default userController;

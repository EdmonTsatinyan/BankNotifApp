import mongoose from "mongoose";
import express from "express";
import { Loan } from "../Model/userModel.js";
import { User } from "../Model/userModel.js";
import path from "path";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  try {
    const loanData = [
      {
        phoneID: 12345,
        bankName: "Ameriabank",
        amount: 1000,
        dueDate: "2024-09-15",
        endDate: "2025-09-15",
        info: "Personal loan",
        amountValute: "USD",
        paidStatus: false,
      },
      {
        phoneID: 12345,
        bankName: "Ardshinbank",
        amount: 1500,
        dueDate: "2024-10-01",
        endDate: "2025-10-01",
        info: "Car loan",
        amountValute: "AMD",
        paidStatus: false,
      },
      {
        phoneID: 67890,
        bankName: "ACBA",
        amount: 2000,
        dueDate: "2024-11-01",
        endDate: "2025-11-01",
        info: "Home loan",
        amountValute: "USD",
        paidStatus: true,
      },
      {
        phoneID: 67890,
        bankName: "Inecobank",
        amount: 2500,
        dueDate: "2024-12-01",
        endDate: "2025-12-01",
        info: "Business loan",
        amountValute: "AMD",
        paidStatus: false,
      },
    ];

    const loans = await Loan.insertMany(loanData);
    console.log("Loans seeded successfully:", loans);

    const userData = [
      {
        phoneID: 12345,
        loans: [loans[0]._id, loans[1]._id],
      },
      {
        phoneID: 67890,
        loans: [loans[2]._id, loans[3]._id],
      },
    ];

    await User.insertMany(userData);
    console.log("Users seeded successfully");

    res.status(200).send({ message: "Users successfully seeded in database!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong while seeding" });
  }
});


export default seedRouter
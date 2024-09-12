import { configDotenv } from "dotenv";
import express from "express";
import connection from "./Utils/connection.js";
import credentials from "./Config/credentials.js";
import corsOptions from "./Config/corsOptions.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./Route/authRouter.js";
import userRouter from "./Route/userRouter.js";
import swaggerUI from "swagger-ui-express";
import specs from "./Utils/Swagger/swagger.js";
import cron from "node-cron";
import admin from "firebase-admin"

import { Loan, User } from "./Model/userModel.js";

const app = express();
const dotenv = configDotenv();
connection();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/api/swagger", swaggerUI.serve, swaggerUI.setup(specs));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


// Function to handle notifications


import serviceAccount from './firebase/pay-app-46884-firebase-adminsdk-257yd-5813471c8c.json' assert { type: 'json' };


admin.initializeApp({
	credential : admin.credential.cert(serviceAccount)
})


const sendPushNotification = (token,loan) => {
  if(token && loan){
    const date = new Date(loan.dueDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const message = {
	  notification: {
		title: 'Loan payment',
		body: `Remember to pay ${loan.amountValute} ${loan.amount} for ${loan.bankName} before ${formattedDate}.`,
	  },
	  token: token,
	};
  
	admin.messaging().send(message)
	  .then((response) => {
		console.log('Successfully sent message:', response);
	  })
	  .catch((error) => {
		console.log('Error sending message:', error);
	  });
  }
  };





async function handleNotifications() {
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1);

  const allLoans = await Loan.find()

  allLoans.map(async (loan)=>{
    const user = await User.findOne({deviceID: loan.deviceID})
    if(user){
      if(loan.dueDate.toISOString().split('T')[0] === today.toISOString().split('T')[0]){
        console.log("--------",{loan, message: "Today is your loan pay day"});
        sendPushNotification(user.firebaseToken,loan)  
      }
      if(loan.dueDate.toISOString().split('T')[0] === tomorrow.toISOString().split('T')[0]){
        console.log("-------",{loan, message: "Tomorrow is your loan pay day"});
        sendPushNotification(user.firebaseToken,loan)  
      }
    }

  })
  

  
}


// Schedule the job to run daily at 9:00 AM
cron.schedule('*/30 * * * * *', handleNotifications);
// cron.schedule('20 11 * * *', handleNotifications);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on ${PORT} •ᴗ• `));

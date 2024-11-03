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
import notifRouter from "./Route/notifRouter.js";
import swaggerUI from "swagger-ui-express";
import specs from "./Utils/Swagger/swagger.js";
import cron from "node-cron";
import admin from "firebase-admin";

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
app.use("/api/notif", notifRouter)

import serviceAccount from "./firebase/bank-app-f43d5-firebase-adminsdk-w5drx-488f9d821e.json" assert { type: "json" };
import Notif from "./Model/notifModel.js";


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (token, loan) => {
  if (token && loan) {
    const date = new Date(loan.dueDate);

    const formattedDate = date.toLocaleDateString("hy-AM", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  
    const message = {
      notification: {
        title: "Վարկի վճարում",
        body: `Վճարման հիշեցում՝ ${loan.amount} ${loan.amountValute} ${loan.bankName} մինչև  ${formattedDate}.`,
      },
      token: token,
      data: {
        loanId: `${loan._id}`,
        url: loan.description,
        notificationText: `Վճարման հիշեցում՝ ${loan.amount} ${loan.amountValute} ${loan.bankName} մինչև  ${formattedDate}.`,
        notificationTitle: "Վարկի վճարում",
      },
      apns: {
        headers: {
          'apns-priority': '10', 
          'apns-push-type': 'alert' 
        },
        payload: {
          aps: {
            alert: {
              title: "Վարկի վճարում",
              body: `Վճարման հիշեցում՝ ${loan.amount} ${loan.amountValute} ${loan.bankName} մինչև  ${formattedDate}.`,
            },
            sound: 'default'
          }
        }
      },
    
    };

    const newNotif = new Notif({
      deviceID: loan.deviceID,
      loanID: loan._id,
      url: loan.description,
      notificationText: `Վճարման հիշեցում՝ ${loan.amount} ${loan.amountValute} ${loan.bankName} մինչև  ${formattedDate}.`,
      notificationTitle: "Վարկի վճարում",
  })

    await newNotif.save()

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  }
};

const sendEndNotifictaion = async (token, loan) => {
  if (token && loan) {

    const findUser = await User.findOne({deviceID: loan.deviceID})

    if(findUser){
      findUser.loans = findUser.loans.filter(l=> l.toString() !== loan._id.toString())
   
      await findUser.save() 
      const deletedLoan = await Loan.findByIdAndDelete(loan._id)

      if(deletedLoan){
        const message = {
          notification: {
            title: "Շնորհավորում ենք",
            body: `Դուք ամբողջությամբ վճարեցիք ${loan.bankName} վարկը`,
          },
          token: token,
          data: {
            loanId: `${loan._id}`,
            url: loan.description,
            notificationText: `Դուք ամբողջությամբ վճարեցիք ${loan.bankName} վարկը`,
            notificationTitle: "Շնորհավորում ենք",
          },
          apns: {
            headers: {
              'apns-priority': '10', 
              'apns-push-type': 'alert' 
            },
            payload: {
              aps: {
                alert: {
                  title: "Շնորհավորում ենք",
                  body: `Դուք ամբողջությամբ վճարեցիք ${loan.bankName} վարկը`,
                },
                sound: 'default'
              }
            }
          },
        
        };
    
        admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
      }else{
        console.log("chjnjvav");
      }
    }else{
      console.log("chka user");
    }




  }
}

async function handleNotifications() {

  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1);

  const allLoans = await Loan.find();

  allLoans.map(async (loan) => {
    const user = await User.findOne({ deviceID: loan.deviceID });
    if (user) {

      if (
        loan.dueDate.toISOString().split("T")[0] ===
        today.toISOString().split("T")[0]
      ) {
        sendPushNotification(user.firebaseToken, loan);
        
      }
      if (
        loan.dueDate.toISOString().split("T")[0] ===
        tomorrow.toISOString().split("T")[0]
      ) {
        sendPushNotification(user.firebaseToken, loan);
        
      }
      if(loan.endDate.toISOString().split("T")[0] === today.toISOString().split("T")[0] && loan.isEnded){
 
        sendEndNotifictaion(user.firebaseToken, loan)
      }
    }
  });
}


// cron.schedule('*/10 * * * * *', handleNotifications);
// cron.schedule('0 */4 * * *', handleNotifications);
// cron.schedule('20 11 * * *', handleNotifications);
cron.schedule('0 9 * * *', handleNotifications);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on ${PORT} •ᴗ• `));

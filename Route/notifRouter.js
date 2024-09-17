import express from "express"
import notifController from "../Controller/notifController.js"

const notifRouter = express.Router()

notifRouter.get("/:deviceID", notifController.getNotif),
notifRouter.delete("/:notifID",notifController.deleteNotif)

export default notifRouter
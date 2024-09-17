import Notif from "../Model/notifModel.js";

const notifService = {
  getNotif: async (deviceID) => {
    if (deviceID) {
      const notification = await Notif.find({ deviceID: deviceID });
        if (notification) {
            return { status: 200, message: "Notification found successfully!",notification:notification };
        }
        else{
         
            return { status: 404, message: "Notifications Not Found" };
        }
    }
    else{
        return{status:400, message:"Notification with provided deviceID is not found!"}
    }
  },
  deleteNotif: async (notifID) => {
    if (notifID) {
        const deletetedNotif = await Notif.findByIdAndDelete(notifID)
        if (deletetedNotif) {
            return{status:200,message:"Notification deleted successfully!", success:true}
        }
        else{
            return{status:400,message:"Failed to delete notification", sucess:false}
        }
    }else{
        return{status:404, message:"Notification with provided deviceID is not found!", success:false}
    }
  },
};
export default notifService;

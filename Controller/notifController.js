import notifService from "../Service/notifService.js"

const notifController = {
    getNotif: async (req,res) =>{
        try {
            const {deviceID} = req.params
            const response = await notifService.getNotif(deviceID)

            if (response.status === 200) {
                res.status(response.status).send({message: response.message, notifications: response.notification})
            }
            else{
                res.status(response.status).send({message:response.message})
            }

        } catch (error) {
           console.error(error)
           res.status(500).send({message:"Internal Server Error"})
        }
    },
    deleteNotif: async (req,res) =>{
        try {
            const {notifID} = req.params
            const response = await notifService.deleteNotif(notifID)
            res.send(response.status).send({message:response.message, success:response.success})
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Internal Server Error"})
        }
    }
}
export default notifController
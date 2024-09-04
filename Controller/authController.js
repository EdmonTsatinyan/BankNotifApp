import authService from "../Service/authService.js"

const authController = {
logIN: async (req,res) =>{
    try {
        const deviceID = req.params.deviceID

        const response = await authService.logIN(deviceID)
        
        if(response.status < 400){
            res.status(response.status).send({user: response.user, message: response.message})
        }else{
            res.status(response.status).send({message:response.message})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
}
export default authController
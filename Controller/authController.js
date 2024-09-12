import authService from "../Service/authService.js"

const authController = {
logIN: async (req,res) =>{
    try {
        const {deviceID,firebaseToken} = req.body

        const response = await authService.logIN(deviceID,firebaseToken)
        
        if(response.status < 400){
            console.log({deviceID: response.deviceID, message: response.message, hasLoans : response.hasLoans});
            res.status(response.status).send({deviceID: response.deviceID, message: response.message, hasLoans : response.hasLoans})
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
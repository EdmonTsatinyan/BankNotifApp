import authService from "../Service/authService.js"

const authController = {
logIN: async (req,res) =>{
    try {
        const phoneID = req.params.phoneID

        const response = await authService.logIN(phoneID)
        
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
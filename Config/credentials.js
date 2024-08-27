import allowedOrigin from "./allowedOrigin.js";

const credentials = (req,res,next) =>{
    const origin = req.headers.origin

    if (allowedOrigin.includes(origin)) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    next()
}
export default credentials
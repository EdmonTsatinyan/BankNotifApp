import { configDotenv } from "dotenv"
import express from "express"
import connection from "./Utils/connection.js"
import credentials from "./Config/credentials.js"
import corsOptions from "./Config/corsOptions.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import authRouter from "./Route/authRouter.js"
import userRouter from "./Route/userRouter.js"
import swaggerUI from "swagger-ui-express"
import specs from "./Utils/Swagger/swagger.js"

const app = express()
const dotenv = configDotenv()
connection()

app.use(express.json())
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:true}))

app.use("/api/swagger",
    swaggerUI.serve,
    swaggerUI.setup(specs)
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

console.log(111);


const PORT = process.env.PORT ||8000
app.listen(PORT, ()=> console.log(`Server is running on ${PORT} •ᴗ• `))
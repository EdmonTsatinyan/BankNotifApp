import allowedOrigin from "./allowedOrigin.js";

const corsOptions = {
    origin: allowedOrigin,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accent", "Authorization"],
    credentials: true
}

export default corsOptions
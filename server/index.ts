import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8181;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`BFF server running at http://localhost:${PORT}`);
});

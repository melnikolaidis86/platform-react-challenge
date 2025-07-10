import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/cats", async (req, res) => {
    try {
        const apiKey = process.env.CAT_API_KEY;
        const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
            params: { limit: 10, api_key: apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching cats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/breeds", async (req, res) => {
    try {
        const apiKey = process.env.CAT_API_KEY;
        const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
            params: { api_key: apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching breeds:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
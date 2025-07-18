import { Router } from "express";
import axios from "axios";

const router = Router();
const apiKey = process.env.CAT_API_KEY!;

router.get("/cats", async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page as string ?? '0');
        const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
            params: { limit: 10, api_key: apiKey, page, has_breeds: '1' } // Display cats with breed information only
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching cats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/cats/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`, {
            params: { api_key: apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching cat details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/breeds", async (req, res) => {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
            params: { api_key: apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching breeds:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/breeds/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
            params: { api_key: apiKey, breed_ids: id }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching breeds:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/favourites", async (req, res) => {
    try {
        const sub_id = req.query.sub_id as string ?? '';
        const page = Number.parseInt(req.query.page as string ?? '0');
        const limit = Number.parseInt(process.env.MAX_FAVOURITES ?? '10');
        const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
            params: { limit, page, sub_id },
            headers: {
                "x-api-key": apiKey
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching favourites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/favourites", async (req, res) => {
    try {
        const { image_id, sub_id } = req.body;
        if (!image_id) {
            return res.status(400).json({ error: "image_id is required" });
        }

        const response = await axios.post(
            "https://api.thecatapi.com/v1/favourites",
            { image_id, sub_id },
            {
                headers: {
                    "x-api-key": apiKey,
                    "Content-Type": "application/json"
                }
            }
        );

        res.status(201).json(response.data);
    } catch (error) {
        console.error("Error adding favourite:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/favourites/:favourite_id", async (req, res) => {
    try {
        const { favourite_id } = req.params;
        if (!favourite_id) {
            return res.status(400).json({ error: "favourite_id is required" });
        }

        const response = await axios.delete(
            `https://api.thecatapi.com/v1/favourites/${favourite_id}`,
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );

        res.status(200).json({ message: "Favourite deleted successfully" });
    } catch (error) {
        console.error("Error deleting favourite:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
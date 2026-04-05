import express from 'express';
import Fish from '../models/Fish.js';

const router = express.Router();

// Create a new fish product
router.post("/add",async (req, res) =>{
    try {
        const {name ,brand, price, stock} = req.body;

        const newFish = new Fish ({
            name,
            brand,
            price,
            stock
        });
        await newFish.save();
        res.status(201).json({
            message : "Fish product added successfully",
            fish: newFish
        });
    } catch (error){
        res.status(500).json({
            message: "Error adding fish product",
            error: error.message
        })
    }
    
});


// Get all fish products
router.get("/all", async (req, res) => {
    try {
        const fishes = await Fish.fish();
        res.json(fishes);    
    } catch (error) {
        res.status(500).json({
            message: "Error fetching fish products",
            error: error.message
        });
    }
});


// Update fish stock
router.put("/update-stock/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const fish = await Fish.findById(id);
        if (!fish) {
            return res.status(404).json({
                message: "Fish product not found"
            });
        }

        fish.stock = stock;
        await fish.save();

        res.json({
            message: "Fish stock updated successfully",
            fish: fish
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating fish stock",
            error: error.message
        });
    }
});

// delete fish product
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const fish = await Fish.findByIdAndDelete(id);
        if (!fish) {
            return res.status(404).json({
                message: "Fish product not found"
            });
        }

        res.json({
            message: "Fish product deleted successfully",
            fish: fish
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting fish product",
            error: error.message
        });
    }
});

export default router;
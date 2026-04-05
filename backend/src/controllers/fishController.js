import Fish from '../models/Fish.js';


// ==============================
// ADD NEW FISH
// ==============================
export const addFish = async (req, res) => {
  try {
    const { name, brand, price, stock } = req.body;

    // validation
    if (!name || !brand || !price || !stock) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newFish = new Fish({
      name,
      brand,
      price,
      stock
    });

    await newFish.save();

    res.status(201).json({
      message: "✅ Fish added successfully",
      fish: newFish
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// GET ALL FISH
// ==============================
export const getAllFish = async (req, res) => {
  try {
    const fishes = await Fish.find().sort({ createdAt: -1 });
    res.json(fishes);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// DELETE FISH
// ==============================
export const deleteFish = async (req, res) => {
  try {
    const { id } = req.params;
    await Fish.findByIdAndDelete(id);
    res.json({ message: "✅ Fish deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// UPDATE FISH PRICE
// ==============================
export const updateFishPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }
    
    const updatedFish = await Fish.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );
    
    res.json({ message: "✅ Price updated", fish: updatedFish });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// UPDATE FISH STOCK
// ==============================
export const updateFishStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    if (stock === undefined) {
      return res.status(400).json({ message: "Stock is required" });
    }
    
    const updatedFish = await Fish.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );
    
    res.json({ message: "✅ Stock updated", fish: updatedFish });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
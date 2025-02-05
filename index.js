const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // If using environment variables

const app = express();
const port = 3010;

// Middleware
app.use(express.json()); // Enable JSON parsing

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/restaurantDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


// Define Menu Schema & Model
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Routes
app.post('/menu', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Menu item created', item: savedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

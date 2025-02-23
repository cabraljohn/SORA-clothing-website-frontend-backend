const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sora_fashion', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePicture: String
});

const User = mongoose.model('User', userSchema);

// Product Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// Order Model
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  total: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Authentication Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, profilePicture } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture
    });

    await user.save();

    // Create token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');

    res.status(201).json({ token, user: { name, email, profilePicture } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');

    res.json({ token, user: { name: user.name, email, profilePicture: user.profilePicture } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Order Routes
app.post('/api/orders', async (req, res) => {
  try {
    const { products, total } = req.body;
    const userId = req.user.id; // From auth middleware

    const order = new Order({
      userId,
      products,
      total,
      status: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Auth Middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
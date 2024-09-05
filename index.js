const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item');

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.DATABASE_URL || 'mongodb://localhost:27017/ecommerce_db';

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Middleware xử lý JSON
app.use(express.json());

// 1. API lấy tất cả items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. API lấy chi tiết item theo ID
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. API cập nhật item theo ID
app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to Node.js CRUD API!');
});

// 4. API thêm item mới
app.post('/items', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. API xóa item theo ID
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cấu hình server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
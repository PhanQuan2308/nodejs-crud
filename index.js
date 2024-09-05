const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce_db')
    .then(() => {
        console.log('connected to mongoDb');
    })
    .catch(err => {
        console.error('failed to connect to MongoDB', err)
    })

//Parse Json -> dung MiddleWare
app.use(express.json());

//1. API get all item
// lambda
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//2. API lay chi tiet theo id
app.get('/items/:id', async(req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//3. API cap nhat theo id
app.put('/items/:id', async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//4. API them items moi
app.post('/items', async(req, res) => {
try {
    
} catch (error) {
    res.status(500).json({ message: error.message });
}
})
//5. API delete theo id
app.delete('/items/:id', async(req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// cau hinh server
app.listen(port, () => {
    console.log('server is renning on http://localhost:${port}');
})


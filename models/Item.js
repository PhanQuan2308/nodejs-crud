const mongoose = require('mongoose');
const itemChema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
});
module.exports = mongoose.model('Item', itemChema);
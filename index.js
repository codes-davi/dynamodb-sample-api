const dbconfig = require('./dbconfig/dynamodb');
const express = require('express');
const app = express();
const productController = require('./controllers/ProductController');
require('dotenv/config');
const PORT = process.env.PORT;

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//main router
app.use('/v1/products', productController);

app.listen(PORT, ()=>{
    console.log('Running');
})
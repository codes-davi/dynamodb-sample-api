const express = require('express');
const router = express.Router();
const dynamodb = require('../services/Product');
const {v4: uuidv4} = require('uuid');

router.get('/', async (req, res) => {

    try {
        result = await dynamodb.getAll();
        res.json(result.Items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    
    let {name, description, price} = req.body;
    const product = {id: Date.now() ,name, description, price};
    
    try {
        result = await dynamodb.addProduct(product);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;
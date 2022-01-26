const express = require('express');
const router = express.Router();
const dynamodb = require('../services/Product');
const {v4: uuidv4} = require('uuid');

router.get('/', async (req, res) => {

    try {
        result = await dynamodb.getAll();
        if (!result.Items.length > 0) res.sendStatus(404);
        else res.json(result.Items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        result = await dynamodb.getById(id);
        if(!result.Item) res.sendStatus(404); 
        else res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    
    let {name, description, price} = req.body;
    const product = {id: Date.now() ,name, description, price};
    
    try {
        result = await dynamodb.addOne(product);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        let result = await dynamodb.deleteById(id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    let {name, description, price} = req.body;
    let product = {name, description, price};
    try {
        let id = parseInt(req.params.id);
        await dynamodb.editById(id,product)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;
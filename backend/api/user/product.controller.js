const ProductService = require('./product.service')
const logger = require('../../services/logger.service')
  
async function getProducts(req, res) {
    const Products = await ProductService.query(req.query)
    res.send(Products)
}

async function addProduct(req, res) {
    try {
        const product = req.body;
        const addedProduct = await ProductService.add(product);        
        res.send(addedProduct);
    } catch (error) {
        logger.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function submitOrder(req, res) {
    try {
        const order = req.body;
        console.log('order',order)
        const submitOrder = await ProductService.submit(order);        
        res.send(submitOrder);
    } catch (error) {
        logger.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getProducts,
    addProduct,
    submitOrder
};
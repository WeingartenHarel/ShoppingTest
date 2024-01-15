const ProductService = require('./product.service')
const logger = require('../../services/logger.service')

async function getProduct(req, res) {
    const Product = await ProductService.getById(req.params.id)
    res.send(Product)
}
  
async function getProducts(req, res) {
    const Products = await ProductService.query(req.query)
    res.send(Products)
}

async function deleteProduct(req, res) {
    await ProductService.remove(req.params.id)
    res.end()
}

async function updateProduct(req, res) {
    const Product = req.body;
    await ProductService.update(Product)
    res.send(Product)
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
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    submitOrder
};
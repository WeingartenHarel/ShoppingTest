const express = require('express')
const {getProduct, getProducts, deleteProduct,addProduct, updateProduct,submitOrder} = require('./product.controller')
const router = express.Router()

router.get('/', getProducts)
router.post('/submit', submitOrder)
router.post('/', addProduct)
router.get('/:id', getProduct)
router.delete('/:id',  deleteProduct)

module.exports = router
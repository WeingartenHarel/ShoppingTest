const express = require('express')
const { getProducts,addProduct,submitOrder} = require('./product.controller')
const router = express.Router()

router.get('/', getProducts)
router.post('/submit', submitOrder)
router.post('/', addProduct)

module.exports = router
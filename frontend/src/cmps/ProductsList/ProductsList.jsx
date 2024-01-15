import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductPreviewSelect from '../ProductPreviewSelect/ProductPreviewSelect';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const ProductList = ({ products, selectedProductsIds }) => {
    const navigate = useNavigate();
    const [error, setError] = useState()
    const handleCheckoutClick = () => {
        if (selectedProductsIds.length < 1) {
            setError('Please select product ')
        } else {
            navigate('/checkout')
        }
    };
    return (
        <section className='products-container'>
            <h4>Product List</h4>
            {products.map(product => <ProductPreviewSelect key={product.type} product={product} selectedProductsIds={selectedProductsIds} />)}
            <Button onClick={handleCheckoutClick} type="submit" variant="contained" color="primary">
                Checkout
            </Button>
            {error && <div>{error}</div>}
        </section>
    );
};

export default ProductList;


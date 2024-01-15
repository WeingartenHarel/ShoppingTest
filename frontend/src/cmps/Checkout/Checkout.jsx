import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ProductPreview from '../ProductPreview/ProductPreview';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sumbitOrder } from '../../store/slices/productSlice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState()
    const [orderDetails, setOrderDetails] = useState({
        full_name: '',
        address: '',
        email: '',
    });
    const { selectedProducts, orderSubmitted } = useSelector(state => state.product);

    const handleCheckoutClick = () => navigate('/');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderDetails.full_name && orderDetails.address && orderDetails.email) {
            setError(null)
            dispatch(sumbitOrder(orderDetails));
        } else {
            setError('Please fill in all required fields')
        }
    };

    return (
        <section className='checkout-section'>
            <h2>Checkout</h2>
            <Button onClick={handleCheckoutClick} type="submit" variant="contained" color="primary">
                Go back to main screen
            </Button>
            <div className='checkout-container'>
                <div className='inputs-container'>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className='inputs-container'
                    >
                        <TextField
                            label="Full name"
                            variant="outlined"
                            onChange={handleChange}
                            name="full_name"
                            value={orderDetails.full_name}
                            required
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            onChange={handleChange}
                            name="address"
                            value={orderDetails.address}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            name="email"
                            value={orderDetails.email}
                            required
                        />
                        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                        {error && <div>{error}</div>}
                    </Box>
                </div>
                <div className='selected-products'>
                <h4>Selected Products</h4>
                    {selectedProducts.map(product => <ProductPreview key={product.id} product={product} />)}
                </div>
            </div>
                {orderSubmitted && <div>Hello {orderSubmitted.full_name} your order has been submitted</div>}
        </section >
    );
};

export default Checkout;

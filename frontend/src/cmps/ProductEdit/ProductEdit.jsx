import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/slices/productSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ProductEdit = ({ product }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [type, setType] = useState(product ? product.type : 'vegetables');
    const [error, setError] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            setError('Product Title required')
        } else {
            e.preventDefault();
            const newProduct = {
                title,
                type,
            };
            dispatch(addProduct(newProduct));
        }
    };

    return (
        <div >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className="product-edit"

            >
                <TextField
                    label="Product Title"
                    variant="outlined"
                    name="full_name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Age"
                    onChange={(e) => setType(e.target.value)}
                    defaultValue="Vegetables"
                >
                    <MenuItem value='vegetables'>Vegetables</MenuItem>
                    <MenuItem value='cleaning'>Cleaning</MenuItem>
                    <MenuItem value='meatAndFish'>Meat and Fish</MenuItem>
                    <MenuItem value='backery'>Backery</MenuItem>
                    <MenuItem value='dairy'>Dairy</MenuItem>
                </Select>
                <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                    Add Product
                </Button>
                {error && <div>{error}</div>}
            </Box>
        </div>
        
        // <form className="product-edit" onSubmit={handleSubmit}>
        //     <h4>{product ? 'Edit Product' : 'Add Product'}</h4>
        //     <label>
        //         Title:
        //         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        //     </label>
        //     <label>
        //         Type:
        //         <select value={type} onChange={(e) => setType(e.target.value)}>
        //             <option value="vegetables">Vegetables</option>
        //             <option value="cleaning">Cleaning</option>
        //             <option value="meatAndFish">Meat and Fish</option>
        //             <option value="backery">Backery</option>
        //             <option value="dairy">Dairy</option>
        //         </select>
        //     </label>
        //     <button type="submit">{product ? 'Edit Product' : 'Add Product'}</button>
        // </form>
    );
};

export default ProductEdit;

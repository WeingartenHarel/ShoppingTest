import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedProductsStore } from '../../store/slices/productSlice'

const ProductPreviewSelect = ({ product, selectedProductsIds }) => {
    const dispacth = useDispatch()
    const handleCheckboxChange = (productId) => {
        dispacth(setSelectedProductsStore(productId))
    };

    return (
        <section key={product.id} className='product-preview'>
            <h4>
                <span>{product.type} </span>
                <span>{product.count} </span>
            </h4>
            {product.products.map(product =>
                <div key={product.id}>
                    <input
                        type="checkbox"
                        id={product.id}
                        checked={selectedProductsIds.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                    />
                    <label htmlFor={product.id}>{product.title}</label>
                </div>
            )}
        </section>
    );
};

export default ProductPreviewSelect;


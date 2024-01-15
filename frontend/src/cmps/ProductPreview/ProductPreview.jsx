import React from 'react';

const ProductPreview= ({ product }) => {
    return (
        <section key={product.id} className='product-preview'>          
                <div key={product.id}>
                    <label>{product.title}</label>
                </div>
        </section>
    );
};

export default ProductPreview;


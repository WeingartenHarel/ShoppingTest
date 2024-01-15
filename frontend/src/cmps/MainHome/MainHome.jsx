import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct , setTotalItems, filterProducts ,getProductsById } from '../../store/slices/productSlice'
import ProductList from '../ProductsList/ProductsList'
import ProductEdit from '../ProductEdit/ProductEdit';

const MainHome = ({ }) => {
    const dispacth = useDispatch()
    const { products , productsFiltred , totalItems, selectedProductsIds } = useSelector(state => state.product);  // Use the selector to get products from Redux store

    useEffect(() => {
        dispacth(getProduct())
    }, [])
    
    useEffect(() => {
        console.log('products',products)
        console.log('products',products.length)
        if (products.length === 0) return
        dispacth(filterProducts(products))
        dispacth(setTotalItems(products))
    }, [products])

    useEffect(()=>{
        dispacth(getProductsById(selectedProductsIds))
    },[selectedProductsIds])

    return (
        <section className='app-container'>
            <h2>Hello world Shopping </h2>
            <h4>Total Items: {totalItems} </h4>
            <div className='main-container'>
                {productsFiltred && <ProductList products={productsFiltred} selectedProductsIds={selectedProductsIds} />}
                <ProductEdit />
            </div>
        </section>
    );
};

export default MainHome;


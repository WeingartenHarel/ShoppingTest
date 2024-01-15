import { createSlice } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

export const getProduct = () => async (dispatch) => {
    try {
        const result = await productService.query();
        dispatch(setProduct(result));
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

export const addProduct = (newProduct) => async (dispatch) => {
    try {
        const addedProduct = await productService.save(newProduct);
        dispatch(addProductToState(addedProduct));
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

export const sumbitOrder = (payload) => async (dispatch) => {
    const order = payload;
    try {
        const result = await productService.submitOrder(order);
        dispatch(setOrder(result));
    } catch (error) {
        console.error('Error editing product:', error);
    }
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productsFiltred: [],
        selectedProductsIds: [],
        selectedProducts: [],
        totalItems: null,
        orderSubmitted:null
    },
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;
        },
        setOrder: (state, action) => {
            state.orderSubmitted = action.payload;
        },
        setTotalItems: (state, action) => {
            const productsTotal = action.payload.length
            state.totalItems = productsTotal
        },
        addProductToState: (state, action) => {
            state.products.push(action.payload);
        },
        editProductInState: (state, action) => {
            const { id, updatedProduct } = action.payload;
            const index = state.products.findIndex(product => product.id === id);
            if (index !== -1) {
                state.products[index] = updatedProduct;
            }
        },
        filterProducts: (state, action) => {
            const products = action.payload
            console.log('filterProducts products',products)
            if (products.length === 0) return
            const prodcutsReduced = products.reduce((acc, product) => {
                const type = product.type;
                if (!acc[type]) {
                    acc[type] = {
                        type,
                        count: 0,
                        products: []
                    };
                }
                acc[type].count += 1;
                acc[type].products.push(product);
                return acc;
            }, {});
            state.productsFiltred = Object.values(prodcutsReduced);
        },
        setSelectedProductsStore: (state, action) => {
            const productId = action.payload
            let selectedProductsIdsCopy = JSON.parse(JSON.stringify(state.selectedProductsIds))
            if (selectedProductsIdsCopy.includes(productId)) {
                selectedProductsIdsCopy = selectedProductsIdsCopy.filter((id) => id !== productId)
            } else {
                selectedProductsIdsCopy.push(productId)
            }
            state.selectedProductsIds = selectedProductsIdsCopy
        },
        getProductsById: (state, action) => {
            const selectedProducts = action.payload
            let productsCopy = JSON.parse(JSON.stringify(state.products))
            const result = selectedProducts.map(id => productsCopy.filter(product => product.id === id)[0])
            state.selectedProducts = result
        },
    },
});

export const { setProduct, addProductToState, editProductInState, filterProducts, setSelectedProductsStore,setOrder , setTotalItems, getProductsById } = productSlice.actions;
export default productSlice.reducer;

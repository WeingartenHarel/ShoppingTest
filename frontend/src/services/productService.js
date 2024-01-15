import HttpService from './HttpService'
  
export const productService = {
    query,
    getById,
    remove,
    save,
    update,
    submitOrder
}

function query() {
    return HttpService.get('product');
}

function getById(productId) {
    return HttpService.get(`product/${productId}`);
}

function remove(productId) {
    return HttpService.delete(`product/${productId}`);
}

function save(product) {
    return HttpService.post('product', product);
}

function update(product) {
    return HttpService.put(`product/${product._id}`, product);
}

function submitOrder(order) {
    return HttpService.post(`product/submit`, order);
}



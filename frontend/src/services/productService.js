import HttpService from './HttpService'
  
export const productService = {
    query,
    save,
    submitOrder
}

function query() {
    return HttpService.get('product');
}

function save(product) {
    return HttpService.post('product', product);
}

function submitOrder(order) {
    return HttpService.post(`product/submit`, order);
}



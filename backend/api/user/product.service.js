const knex = require('../../services/db.service.mysql'); // Assuming dbService is a Knex instance
const uuid = require('uuid');

module.exports = {
    query,
    add,
    submit
};

async function query() {
    try {
        const products = await knex('product').select('*');
        return products;
    } catch (err) {
        console.error('ERROR: cannot find products', err);
        throw err;
    }
}

async function add(product) {
    try {
        const fullUuid = uuid.v4(); // Generate a unique ID
        product.id = fullUuid.substr(0, 8); // Extract the first 8 characters

        await knex('product').insert({
            id: product.id,
            title: product.title,
            type: product.type
        });

        return product;
    } catch (err) {
        console.error('ERROR: cannot insert product', err);
        throw err;
    }
}

async function submit(order) {
    const fullUuid = uuid.v4(); 
    order.id = fullUuid.substr(0, 8); 
    try {
        const { full_name, address, email, products, id } = order;
        const result = await knex('orders')
            .returning('*') 
            .insert({
                id,
                full_name,
                address,
                email,
                products: JSON.stringify(products)
            });

        return order
    } catch (err) {
        console.error('ERROR: cannot submit order', err);
        throw err;
    }
}
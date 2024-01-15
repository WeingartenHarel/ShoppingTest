const knex = require('../../services/db.service.mysql'); // Assuming dbService is a Knex instance
const uuid = require('uuid');

module.exports = {
    query,
    getById,
    remove,
    update,
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

async function getById(productId) {
    try {
        const product = await knex('product').where('id', productId).first();
        // Assuming you want to exclude the password property
        if (product) {
            delete product.password;
        }

        return product;
    } catch (err) {
        console.log(`ERROR: while finding product ${productId}`, err);
        throw err;
    }
}

async function remove(productId) {
    try {
        await knex('product').where('id', productId).del();
    } catch (err) {
        console.log(`ERROR: cannot remove product ${productId}`, err);
        throw err;
    }
}

async function update(product) {
    try {
        await knex('product').where('id', product.id).update({
            title: product.title,
            type: product.type
        });

        return product;
    } catch (err) {
        console.log(`ERROR: cannot update product ${product.id}`, err);
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
    const fullUuid = uuid.v4(); // Generate a unique ID
    order.id = fullUuid.substr(0, 8); // Extract the first 8 characters
    try {
        // Extract relevant information from the order object
        const { full_name, address, email, products, id } = order;

        // Insert the order information into the orders table
        const result = await knex('orders')
            .returning('*') // Use returning to get the inserted record
            .insert({
                id,
                full_name,
                address,
                email,
                products: JSON.stringify(products) // Store products as a JSON string
            });

        return order
    } catch (err) {
        console.error('ERROR: cannot submit order', err);
        throw err;
    }
}
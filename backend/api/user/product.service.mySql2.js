const dbService = require('../../services/db.service');
const uuid = require('uuid');

module.exports = {
    query,
    getById,
    remove,
    update,
    add
};

async function query() {
    const pool = await dbService.getCollection('product');

    try {
        const [rows, fields] = await pool.execute('SELECT * FROM product');
        const products = rows.map(item => {
            return item;
        });
        return products;
    } catch (err) {
        console.error('ERROR: cannot find products', err);
        throw err;
    }
}

async function getById(productId) {
    const connection = await dbService.getCollection('product');

    try {
        const [rows] = await connection.execute('SELECT * FROM product WHERE id = ?', [productId]);
        const product = rows[0];
        delete product.password; // Assuming password is a property you want to exclude

        return product;
    } catch (err) {
        console.log(`ERROR: while finding product ${productId}`, err);
        throw err;
    } finally {
        if (connection.release) {
            connection.release();
        }
    }
}

async function remove(productId) {
    const connection = await dbService.getCollection('product');

    try {
        await connection.execute('DELETE FROM product WHERE id = ?', [productId]);
    } catch (err) {
        console.log(`ERROR: cannot remove product ${productId}`, err);
        throw err;
    } finally {
        if (connection.release) {
            connection.release();
        }
    }
}

async function update(product) {
    const connection = await dbService.getCollection('product');

    try {
        await connection.execute('UPDATE product SET title = ?, price = ?, type = ? WHERE id = ?', [
            product.title,
            product.type,
            product.id
        ]);

        return product;
    } catch (err) {
        console.log(`ERROR: cannot update product ${product.id}`, err);
        throw err;
    } finally {
        if (connection.release) {
            connection.release();
        }
    }
}
 

async function add(product) {
    const connection = await dbService.getCollection('product');
    console.log('add product', product)
    try {
        const fullUuid = uuid.v4(); // Generate a unique ID
        product.id = fullUuid.substr(0, 8); // Extract the first 8 characters
        console.log('add id', product)

        const result = await connection.execute('INSERT INTO product (id, title, type) VALUES (?, ?, ?)', [
            product.id,
            product.title,
            product.type
        ]);
        console.log('add result', result)
        console.log('add product', product)
        return product;
    } catch (err) {
        console.error('ERROR: cannot insert product', err);
        throw err;
    }
}
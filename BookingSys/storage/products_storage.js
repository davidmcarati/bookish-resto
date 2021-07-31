const db = require("./db.js");

const products_storage = {
    createProduct  : async (params) => {
        let { name, price }     =   params;
        let newProduct          =   await db.query('INSERT INTO product (name, price) values ($1, $2) RETURNING *',
            [name, price]);
        return newProduct.rows[0];
    },

    getProductList : async () => {
        let productList         =   await db.query('SELECT * FROM product');
        return productList.rows;
    },

    getProduct     : async (params) => {
        let product             =   await db.query('SELECT * FROM product where p_id = $1', [params.id]);
        return product.rows[0];
    },

    deleteProduct  : async (params) => {
        let product             =   await db.query('DELETE FROM product where p_id = $1', [params.id]);
        return product.rows[0];
    },

    updateProduct  : async (params) => {
        let {id, name, price} = params;
        let product             =   await db.query(
            'UPDATE product set name = $1, price = $2 where p_id = $3 RETURNING *',
            [name, price, id]);
        return product.rows[0];
    }
};

module.exports = products_storage;
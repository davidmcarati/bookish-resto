const storage   =   require("./../storage/products_storage");

const worker = {
    createProduct  :   async (params) => {
        params.price = parseFloat(params.price);
        return await storage.createProduct(params);
    },

    updateProduct  :   async (params) => {
        params.price = parseFloat(params.price);
        return await storage.updateProduct(params);
    },

    getProductList :   async () => {
        return await storage.getProductList();
    },

    getProductData :   async (params) => {
        return await storage.getProduct(params);
    },

    deleteProduct  :   async (params) => {
        return await storage.deleteProduct(params);
    }
};

module.exports = worker;
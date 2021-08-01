const storage   =   require("./../storage/products_storage");

const worker = {
    createProduct   :   async (params) => {
        params.price = parseFloat(params.price);
        return await storage.createProduct(params);
    },

    updateProduct   :   async (params) => {
        params.price = parseFloat(params.price);
        return await storage.updateProduct(params);
    },

    getProductList  :   async () => {
        return await storage.getProductList();
    },

    getProductData  :   async (params) => {
        return await storage.getProduct(params);
    },

    deleteProduct   :   async (params) => {
        return await storage.deleteProduct(params);
    },

    checkProducts   :   async (list) => {
        for(let i = 0; i < list.length; i++){
            if((await worker.getProductData({id : list[i]})) === undefined){
                return false;
            }
        }
        return true;
    }
};

module.exports = worker;
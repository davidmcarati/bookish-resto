const storage   =   require("./../storage/reserve_storage.js");
const products  =   require("./../workers/products_worker.js");

const worker = {
    createReserve           :   async (params)  => {
        params.start_time   = new Date(params.start_time);
        params.end_time     = new Date(params.end_time);
        return await storage.createReserve(params);
    },

    updateReserveOrders     :   async (params) => {
        return await storage.updateReserveOrders(params);
    },

    getReserve              :   async (params)  => {
        let reserve = await storage.getReserveById(params);
        for(let i = 0; i < reserve.orders.length; i++){
            reserve.orders[i] = await products.getProductData({id : reserve.orders[i]});
        }
        console.log(reserve.orders);
        return reserve;
    },

    getReserveByDate        :   async (params)  => {
        return await storage.getReserveByDate(params);
    },

    deleteReserve_person    :   async(params)   => {
        return await storage.deleteReserveByPerson(params);
    },

    deleteReserve_rtable    :   async(params)   => {
        return await storage.deleteReserveByRTable(params);
    },

    deleteReserve           :   async(params)   => {
        return await storage.deleteReserveById(params);
    }
};

module.exports = worker;
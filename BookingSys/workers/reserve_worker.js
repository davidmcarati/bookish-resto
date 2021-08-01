const storage   =   require("./../storage/reserve_storage");

const worker = {
    createReserve   :   async (params) => {
        params.start_time   = new Date(params.start_time);
        params.end_time     = new Date(params.end_time);
        return await storage.createReserve(params);
    }
};

module.exports = worker;
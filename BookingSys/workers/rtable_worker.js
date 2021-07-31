const storage   =   require("./../storage/rtable_storage");

const worker = {
    createRTable  :   async (params) => {
        params.seats = parseInt(params.seats);
        return await storage.createRTable(params);
    },

    updateRTable  :   async (params) => {
        params.seats = parseInt(params.seats);
        return await storage.updateRTable(params);
    },

    getRTableList :   async () => {
        return await storage.getRTableList();
    },

    getRTableData :   async (params) => {
        return await storage.getRTable(params);
    },

    deleteRTable  :   async (params) => {
        return await storage.deleteRTable(params);
    }
};

module.exports = worker;
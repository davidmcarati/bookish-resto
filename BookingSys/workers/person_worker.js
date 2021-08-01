const storage   =   require("../storage/person_storage");

const worker = {
    createUser  :   async (params) => {
        return await storage.createUser(params);
    },

    updateUser  :   async (params) => {
        return await storage.updateUser(params);
    },

    getUserList :   async () => {
        return await storage.getUserList();
    },

    getUserData :   async (params) => {
        return await storage.getUser(params);
    },

    deleteUser  :   async (params) => {
        return await storage.deleteUser(params);
    }
};

module.exports = worker;
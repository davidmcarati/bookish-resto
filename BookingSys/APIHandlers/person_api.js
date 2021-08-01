const valid     =   require('../booking_valid.js');
const worker    =   require('../workers/person_worker.js');
const reserve   =   require('../workers/reserve_worker');

const usersRouter = {
    post_user   : async (req, res, next) => {
        let params = {
            username : req.body.username,
            password : req.body.password
        };
        let result = await POST_CreateUser(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    put_user    : async (req, res, next) => {
        let params = {
            id          : req.body.id,
            username    : req.body.username,
            password    : req.body.password
        };
        let result = await PUT_UpdateUser(params);
        if(!result.dataValid){
            res.send({error : "Invalid put data"})
        } else {
            res.send(result);
        }
    },

    get_user    : async (req, res, next) => {
        let result = await GET_GetUsers();
        if(!result.dataValid){
            res.send({error : "Invalid get data"})
        } else {
            res.send(result);
        }
    },

    get_user_id : async (req, res, next) => {
        let params = {
            id : req.params.id
        };
        let result = await GET_GetUser(params);
        if(!result.dataValid){
            res.send({error : "Invalid get data"})
        } else {
            res.send(result);
        }
    },

    delete_user : async (req, res, next) => {
        let params = {
            id  : req.params.id
        };
        let result = await DELETE_User(params);
        if(!result.dataValid){
            res.send({error : "Invalid delete data"})
        } else {
            res.send(result);
        }
    }
}

//---------------------vvv-----Handlers Here-----vvv------------------------------

const POST_CreateUser   = async (params) => {
    let result = {
        dataValid   : false,
        user        : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_create_user_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.user         =   await worker.createUser(params);
    result._status      =   "200 : Ok";
    return result;
};

const PUT_UpdateUser    = async (params) => {
    let result = {
        dataValid   : false,
        user        : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_update_user(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.user         =   await worker.getUserData(params);
    if(!result.user)        {result._status = "404 : Not Found";    return result;}
    result.user         =   await worker.updateUser(params);
    result._status      =   "200 : Ok";
    return result;
};

const GET_GetUsers      = async () => {
    let result = {
        dataValid   : true,
        users       : {},
        _status     : ""
    };
    result.users    =   await worker.getUserList();
    result._status      =   "200 : Ok";
    return result;
};

const GET_GetUser       = async (params) => {
    let result = {
        dataValid   : false,
        user        : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_get_user_data(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.user         =   await worker.getUserData(params);
    if(!result.user)        {result._status = "404 : Not Found";    return result;}
    result._status      =   "200 : Ok";
    return result;
};

const DELETE_User       = async (params) => {
    let result = {
        dataValid   : false,
        user        : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_delete_user(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.user         =   await worker.getUserData(params);
    if(!result.user)        {result._status = "404 : Not Found";    return result;}
    result.reserve      =   await reserve.deleteReserve_person({p_id : params.id});
    result.user         =   await worker.deleteUser(params);
    result._status      =   "200 : Ok";
    return result;
};  

module.exports = usersRouter;
const valid     =   require('./../booking_valid.js');
const worker    =   require('./../workers/rtable_worker.js');
const reserve   =   require('./../workers/reserve_worker.js');

const rtableRouter = {
    post_rtable   : async (req, res, next) => {
        let params = {
            name    : req.body.name,
            seats   : req.body.seats
        };
        let result = await POST_CreateRTable(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    put_rtable    : async (req, res, next) => {
        let params = {
            id          : req.body.id,
            name        : req.body.name,
            seats       : req.body.seats
        };
        let result = await PUT_UpdateRTable(params);
        if(!result.dataValid){
            res.send({error : "Invalid put data"})
        } else {
            res.send(result);
        }
    },

    get_rtable    : async (req, res, next) => {
        let result = await GET_GetRTables();
        if(!result.dataValid){
            res.send({error : "Invalid get data"})
        } else {
            res.send(result);
        }
    },

    get_rtable_id : async (req, res, next) => {
        let params = {
            id : req.params.id
        };
        let result = await GET_GetRTable(params);
        if(!result.dataValid){
            res.send({error : "Invalid get data"})
        } else {
            res.send(result);
        }
    },

    delete_rtable : async (req, res, next) => {
        let params = {
            id  : req.params.id
        };
        let result = await DELETE_RTable(params);
        if(!result.dataValid){
            res.send({error : "Invalid delete data"})
        } else {
            res.send(result);
        }
    }
}

//---------------------vvv-----Handlers Here-----vvv------------------------------

const POST_CreateRTable     = async (params) => {
    let result = {
        dataValid   : false,
        rtable      : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_create_rtable_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.rtable       =   await worker.createRTable(params);
    result._status      =   "200 : Ok";
    return result;
};

const PUT_UpdateRTable      = async (params) => {
    let result = {
        dataValid   : false,
        rtable      : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_update_rtable(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.rtable       =   await worker.getRTableData(params);
    if(!result.rtable)      {result._status = "404 : Not Found";    return result;}
    result.rtable       =   await worker.updateRTable(params);
    result._status      =   "200 : Ok";
    return result;
};

const GET_GetRTables        = async () => {
    let result = {
        dataValid   : true,
        rtable      : {},
        _status     : ""
    };
    result.rtable       =   await worker.getRTableList();
    result._status      =   "200 : Ok";
    return result;
};

const GET_GetRTable         = async (params) => {
    let result = {
        dataValid   : false,
        rtable      : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_get_rtable_data(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.rtable       =   await worker.getRTableData(params);
    if(!result.rtable)      {result._status = "404 : Not Found";    return result;}
    result._status      =   "200 : Ok";
    return result;
};

const DELETE_RTable         = async (params) => {
    let result = {
        dataValid   : false,
        rtable      : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_delete_rtable(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.rtable       =   await worker.getRTableData(params);
    if(!result.rtable)      {result._status = "404 : Not Found";    return result;}
    result.reserve      =   await reserve.deleteReserve_rtable({rt_id : params.id});
    result.rtable       =   await worker.deleteRTable(params);
    result._status      =   "200 : Ok";
    return result;
};  

module.exports = rtableRouter;
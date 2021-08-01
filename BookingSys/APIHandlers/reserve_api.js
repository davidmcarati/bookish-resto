const valid     =   require('../booking_valid.js');
const reserve   =   require('../workers/reserve_worker.js');
const products  =   require('../workers/products_worker.js');
const person    =   require('../workers/person_worker.js');
const rtable    =   require('../workers/rtable_worker.js')
const time      =   require('../workers/time_worker.js');

const reservesRouter = {
    post_reserve            : async (req, res, next) => {
        let params = {
            p_id        : req.body.person,
            rt_id       : req.body.rtable,
            start_time  : req.body.start_time,
            end_time    : req.body.end_time
        };
        let result = await POST_CreateReserve(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    get_reserve             : async (req, res, next) => {
        let params = {
            id      : req.params.id
        }
        let result  = await GET_Reserve(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    delete_reserve          : async (req, res, next) => {
        let params  = {
            id      : req.params.id
        };
        let result  = await DELETE_Reserve(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    put_reserve_orders      : async (req, res, next) => {
        let params  = {
            id      : req.body.id,
            orders  : req.body.orders
        }
        let result  = await PUT_Reserve_Orders(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    view_reserve_by_date    : async (req, res, next) => {
        let params = {
            date    :   req.params.date
        }
        let result = await VIEW_ReservesByDay(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    }
}

//---------------------vvv-----Handlers Here-----vvv------------------------------

const POST_CreateReserve    = async (params) => {
    let result      = {
        dataValid   : false,
        reserve     : {},
        isBlocked   : false,
        _status     : ""
    };
    result.dataValid    =   valid.validate_create_reserve_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result;}
    let personQuery = {
        id          : params.p_id
    }
    let person_obj      =   await person.getUserData(personQuery);
    if(!person_obj)         {result._status = "404 : No Such a Person"; return result;}
    let rtableQuery = {
        id          : params.rt_id
    }
    let rtable_obj      =   await rtable.getRTableData(rtableQuery);
    if(!rtable_obj)         {result._status = "404 : No Such a RTable"; return result;}
    isBlocked           =   await time.check_reserve_times(params);
    if(!isBlocked)          {result._status = "403 : Blocked";          return result;}
    result.product      =   await reserve.createReserve(params);
    result._status      =   "200 : Ok";
    return result;
};

const GET_Reserve           = async (params) => {
    let result      = {
        dataValid   : false,
        reserve     : {},
        _status     : ""
    }
    result.dataValid    =   valid.validate_get_reserve(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result;}
    result.reserve      =   await reserve.getReserve(params);
    if(!result.reserve)     {result._status = "404 : Not Found"; }
    return result;
};

const DELETE_Reserve        = async (params) => {
    let result      = {
        dataValid   : false,
        reserve     : {},
        _status     : ""
    }
    result.dataValid    =   valid.validate_delete_reserve(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result;}
    result.reserve      =   await reserve.getReserve(params);
    if(!result.reserve)     {result._status = "404 : Not Found";        return result;}
    result.reserve      =   await reserve.deleteReserve(params);
    result._status      =   "200 : Ok";
    return result;
};

const PUT_Reserve_Orders    = async (params) => {
    let result      = {
        dataValid   : false,
        reserve     : {},
        orders_ok   : false,
        _status     : ""
    }
    result.dataValid    =   valid.validate_put_orders(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result;}
    let orderList       = [];
    params.orders       = params.orders.split(",");
    for(let i = 0; i < params.orders.length; i++){
        if(!isNaN(parseInt(params.orders[i]))){
            orderList.push(parseInt(params.orders[i]));
        }
    }
    result.orders_ok    = await products.checkProducts(orderList);
    if(!result.orders_ok)   {result._status = "404 : Not Found";        return result;}
    result.reserve      = await reserve.updateReserveOrders(params);
    return result;
};

const VIEW_ReservesByDay     = async (params) => {
    let result      = {
        dataValid   : true,
        reserves    : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_get_reserve_by_date(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result;}
    result.reserves     =   await reserve.getReserveByDate(params);
    return result;
};

module.exports = reservesRouter;
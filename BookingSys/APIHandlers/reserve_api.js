const valid     =   require('../booking_valid.js');
const reserve   =   require('../workers/reserve_worker.js');
const person    =   require('../workers/person_worker.js');
const rtable    =   require('../workers/rtable_worker.js')

const reservesRouter = {
    post_reserve    : async (req, res, next) => {
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
    }
}

//---------------------vvv-----Handlers Here-----vvv------------------------------

const POST_CreateReserve     = async (params) => {
    let result      = {
        dataValid   : false,
        reserve     : {},
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
    result.product      =   await reserve.createReserve(params);
    result._status      =   "200 : Ok";
    return result;
};

module.exports = reservesRouter;
const valid         =   require('../booking_valid.js');
const time          =   require('../workers/time_worker.js');

const timeRouter    = {
    get_locked_times_day : async (req, res, next) => {
        let params  = {
            date    :   req.params.date
        }
        let result = await GET_LockedTimesDay(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    }
}

const GET_LockedTimesDay = async (params) => {
    let result      = {
        dataValid   : true,
        times       : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_get_free_reserves_day(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result;}
    result.times        =   await time.get_locks_by_date(params);
    return result;
};

module.exports = timeRouter;
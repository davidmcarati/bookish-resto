const storage   =   require("./../storage/reserve_storage");
const reserve   =   require("./../workers/reserve_worker");
const config    =   require("./../booking_config.js");

const worker            = {
    get_locks_by_date   : async (params) => {        //params.date
        let times       = await reserve.getReserveByDate(params);
        let available   = CalcBusyTimes(times);
        return available;
    },

    check_reserve_times : async (params) => {
        let st_time     = parseInt(params.start_time.toString());
        let end_time    = parseInt(params.end_time.toString());
        st_time         = new Date(st_time);
        end_time        = new Date(end_time);
        let lock_param  = {
            date        : st_time.getFullYear() + "-" + (st_time.getMonth()+1) + "-" + st_time.getDate()
        }
        let blocks      = await worker.get_locks_by_date(lock_param);
        let reserve_ok  = true;
        st_time         = hr_mn(st_time);
        end_time        = hr_mn(end_time);
        let day_st      = str_to_hr_mn(config.day_start);
        let day_end     = str_to_hr_mn(config.day_end);
        if(!inRange(st_time, day_st, day_end) || !inRange(end_time, day_st, day_end)){
            reserve_ok  = false;
            return reserve_ok;
        }
        for(let i = 0; i < blocks.length; i++){
            if( inRange(str_to_hr_mn(blocks[i].start_time)  , st_time, end_time) || 
                inRange(str_to_hr_mn(blocks[i].end_time)    , st_time, end_time)){
                    reserve_ok = false;
                }
        }
        if(!reserve_ok) return reserve_ok;
        for(let i = 0; i < blocks.length; i++){
            if( inRange(st_time     , str_to_hr_mn(blocks[i].start_time), str_to_hr_mn(blocks[i].end_time)) ||
                inRange(end_time    , str_to_hr_mn(blocks[i].start_time), str_to_hr_mn(blocks[i].end_time))){
                    reserve_ok = false;
                }
        }
        return reserve_ok;
    }
}

const CalcBusyTimes     = (reserves) => {
    let blocks = [];
    let tempDat, tempDat2;
    for(let i = 0; i < reserves.length; i++){
        tempDat     = new Date(reserves[i].start_time);
        tempDat2    = new Date(reserves[i].end_time);
        blocks.push({
            start_time  : nt(tempDat.getHours()) + ":" + nt(tempDat.getMinutes()),
            end_time    : nt(tempDat2.getHours()) + ":" + nt(tempDat2.getMinutes())
        })
    }
    return blocks;
}

const nt                = (val) => {    //Normalize Time Element
    val = val < 10 ? "0"+val : val;
    return val;
}

const hr_mn             = (val) => {
    return val.getHours() * 60 + val.getMinutes();
}

const inRange           = (x, min, max) => {
    return ((x-min)*(x-max) <= 0);
}

const str_to_hr_mn      = (val) => {
    let tx = val.split(':');
    return parseInt(tx[0])*60 + parseInt(tx[1]);
}

module.exports  = worker;
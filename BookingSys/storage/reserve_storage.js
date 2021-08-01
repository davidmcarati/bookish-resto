const db = require("./db.js");

const reserve_storage = {
    createReserve           : async (params) => {
        let { p_id, rt_id, start_time, end_time }   =   params;
        let reserve = await db.query('INSERT INTO reserve (p_id, rt_id, start_time, end_time, orders) values ($1, $2, $3, $4, $5) RETURNING *',
            [p_id, rt_id, start_time, end_time, []]);
        return reserve.rows[0];
    },

    deleteReserveByPerson   : async (params) => {
        let reserve = await db.query('DELETE FROM reserve where p_id = $1', [params.p_id]);
        return reserve.rows[0];
    },

    deleteReserveByRTable   : async (params) => {
        let reserve = await db.query('DELETE FROM reserve where rt_id = $1', [params.rt_id]);
        return reserve.rows[0];
    },

    deleteReserveById       : async (params) => {
        let reserve = await db.query('DELETE FROM reserve where reserve_id = $1', [params.id]);
        return reserve.rows[0];
    },

    getReservesBetweenTime  : async (params) => {
        let {time1, time2}  = params;   //Getting time in format YYYY-MM-DD
        let reserve = await db.query('SELECT * FROM reserve where start_time between $1 and $2', [time1, time2]);
        return reserve.rows;
    },

    getReserveById          : async (params) => {
        return (await db.query('SELECT * FROM reserve where reserve_id = $1', [params.id])).rows[0];
    },

    getReserveByDate        : async (params) => {
        let value   = params.date;
        let value1  = value + " 00:00:00";
        let value2  = value + " 24:00:00";
        return (await db.query("SELECT * FROM reserve where start_time between $1 and $2", [value1, value2])).rows;
    },

    updateReserveOrders     : async (params) => {
        let { id, orders }  = params;
        console.log(id, orders);
        return (await db.query("UPDATE reserve set orders = $1 where reserve_id = $2 RETURNING *", [orders, id])).rows[0];
    }
};

module.exports = reserve_storage;
const db = require("./db.js");

const reserve_storage = {
    createReserve   : async (params) => {
        let { p_id, rt_id, start_time, end_time }   =   params;
        let reserve = await db.query('INSERT INTO reserve (p_id, rt_id, start_time, end_time, orders) values ($1, $2, $3, $4, $5) RETURNING *',
            [p_id, rt_id, start_time, end_time, []]);
        return reserve.rows[0];
    }
};

module.exports = reserve_storage;
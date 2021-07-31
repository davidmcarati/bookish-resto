const db = require("./db.js");

const rtable_storage = {
    createRTable    : async (params) => {
        let { name, seats }     =   params;
        let newRTable           =   await db.query('INSERT INTO rtable (name, seats_am) values ($1, $2) RETURNING *',
            [name, seats]);
        return newRTable.rows[0];
    },

    getRTableList   : async (params) => {
        let rTableList          =   await db.query('SELECT * FROM rtable');
        return rTableList.rows;
    },

    getRTable       : async (params) => {
        let rTable              =   await db.query('SELECT * FROM rtable where rtable_id = $1', [params.id]);
        return rTable.rows[0];  
    },

    deleteRTable    : async (params) => {
        let rTable              =   await db.query('DELETE FROM rtable where rtable_id = $1', [params.id]);
    },
    
    updateRTable    : async (params) => {
        let {id, name, seats}   =   params;
        let rTable              =   await db.query(
            'UPDATE rtable set name = $1, seats_am = $2 where rtable_id = $3 RETURNING *',
            [name, seats, id]
        )
    }
};

module.exports = rtable_storage;
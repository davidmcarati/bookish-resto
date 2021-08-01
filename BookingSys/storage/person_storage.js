const db = require("./db.js");

const booking_storage = {
    createUser  : async (params) => {
        let { username, password } = params;
        let newPerson   =   await db.query('INSERT INTO person (username, password) values ($1, $2) RETURNING *',
            [username, password]);
        return newPerson.rows[0];
    },

    getUserList : async () => {
        let personList  =   await db.query('SELECT * FROM person');
        return personList.rows;
    },

    getUser     : async (params) => {
        let person      =   await db.query('SELECT * FROM person where person_id = $1', [params.id]);
        return person.rows[0];
    },

    deleteUser  : async (params) => {
        let person      =   await db.query('DELETE FROM person where person_id = $1', [params.id]);
        return person.rows[0];
    },

    updateUser  : async (params) => {
        let {id, username, password} = params;
        let person      =   await db.query(
            'UPDATE person set username = $1, password = $2 where person_id = $3 RETURNING *',
            [username, password, id]);
        return person.rows[0];
    }
};

module.exports = booking_storage;
const POOL = require('pg').Pool;
const config    =   require("./../booking_config.js");
const pool = new POOL(config.db_auth);
module.exports = pool;
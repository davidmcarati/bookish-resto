const pg        = require('pg');
const POOL      = require('pg').Pool;
const config    = require("./../booking_config.js");
const pool      = new POOL(config.db_auth);
//pg.types.setTypeParser(1114, str => str);
module.exports  = pool;
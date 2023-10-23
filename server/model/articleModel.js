const { Pool } = require('pg');

const PG_URI = 'postgres://rodpalun:BuL3bNlc0LsZD9Mn2q9eJXZTdk-wDoKK@suleiman.db.elephantsql.com/rodpalun';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, queryParams, callback) => {
      // console.log('connected to db', text);
      return pool.query(text, queryParams, callback);
    }
  };
  
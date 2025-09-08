const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SchoolDB",
  password: "123",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end()
};

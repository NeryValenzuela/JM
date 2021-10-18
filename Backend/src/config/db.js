if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: false,
  },
};

exports.config = config;

import { createPool } from "mysql2";

import express from "express";

const app = express();
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "databasefir",
});

export default pool
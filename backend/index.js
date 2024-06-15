import express from "express";
import { connection } from "./db.js";
import Router from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
const app = express();
const PORT = 3000;

app.use("/api/v1", Router);
app.use(bodyParser.json());
app.use(cors());

connection();

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});

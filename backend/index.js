import express from "express";
import cors from "cors";
import { connection } from "./db.js";
import bodyParser from 'body-parser'
import Router from "./routes/userRoutes.js";
const app = express();
const PORT = 3000;

connection();

app.use(express.json());
app.use(cors());
app.use("/api/v1", Router);


app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});

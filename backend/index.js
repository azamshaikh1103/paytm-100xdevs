import express from "express";
import cors from "cors";
import { connection } from "./db.js";
import router from "./routes/index.js";
const app = express();
const PORT = 3000;

connection();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});

import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { specsRouter } from "./routes/specs.js";

const app = express();
const port = process.env.PORT || 3001
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/specs", specsRouter);

dotenv.config();
mongoose.connect(process.env.URI);

app.listen(port, () => console.log("SERVER STARTED"));
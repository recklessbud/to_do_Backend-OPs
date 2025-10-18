import express from "express";
import useRouter from "./routes/index";
import errorHandler from "./Middlewares/ErrorHandler";
import path from "path";
import cors from "cors";
import { config } from "dotenv";

const app = express();
config() 
const logger = require("morgan");
const port = process.env.PORT;
const startUp = require("debug")("startup"); 

startUp("Application is starting...");
 

app.use(cors({
  origin: "*", // فقط برای تست، در پروڈاکشن توصیه نمی‌شه
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));


app.use(express.json());

app.use("/api",useRouter);

app.get("/api/text", (req, res) => {
  res.send("Welcome to the Express server!");
});

if (app.get("env") === "development") {

  app.use(logger("dev"));
}

useRouter.use(express.static(path.join(__dirname, "public")));
useRouter.use(express.urlencoded({ extended: true }));
useRouter.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
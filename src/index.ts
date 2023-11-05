import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { verifyToken } from "./middleware/authJwt";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  updateUser,
} from "./services";
import { getFromCache } from "./middleware/getFromCache";
import { initCache } from "./cacheHandler";
import { checkUserExists } from "./middleware/checkUserExists";

const port = process.env.PORT || 8000;
const app: Application = express();
initCache();

const corsOptions = {
  origin: ["www.google.com", "http://localhost", "https://www.facebook.com"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

const server = http.createServer(app);

const authRouter = express.Router();
const userRouter = express.Router();
userRouter.use(verifyToken);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});

authRouter.post("/register", login);
authRouter.post("/login", login);

userRouter.get("/getUsers/:page", getUsers);
userRouter.get("/getUser/:id", getFromCache, getUser);
userRouter.post("/createUser", createUser);
userRouter.put("/updateUser/:id", checkUserExists, updateUser);
userRouter.delete("/deleteUser/:id", checkUserExists, deleteUser);

app.use(authRouter);
app.use(userRouter);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

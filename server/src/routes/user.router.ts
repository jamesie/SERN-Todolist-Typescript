import express from "express";
import UserController from "../controllers/user.controller";
import { cookieLogoutorDeleteHandle } from '../utils/destoryCookie';

const UserRouter = express.Router()
let statusNum = 200

UserRouter.post("/register", async (req, res) => {
  const controller = new UserController();
  const response = await controller.register(req).catch((err: Error) => {
    statusNum = 400
    return err.message
  });
  return res.status(statusNum).send(response);
});

UserRouter.post("/login", async (req, res) => {
  const controller = new UserController();
  const response = await controller.login(req).catch((err: Error) => {
    statusNum = 400
    return err.message
  });;
  return res.status(statusNum).send(response);
});

UserRouter.post('/delete', async (req, res) => {
  const controller = new UserController();
  await controller.deleteAccount(req)
  const cookieStatus = await cookieLogoutorDeleteHandle(req, res)
  res.send(cookieStatus)
})

UserRouter.post('/logout', async (req, res) => {
  const cookieStatus = await cookieLogoutorDeleteHandle(req, res)
  res.send(cookieStatus)
})

UserRouter.get("/me", async (req, res) => {
  const controller = new UserController();
  const response = await controller.me(req)
  res.send(response)
})

export default UserRouter;
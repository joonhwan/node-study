import {Request} from "express";


declare module "express-session" {
  interface SessionData {
    userId: number,
    userName: string,
  }
}

export interface MyContext {
  req: Request
}
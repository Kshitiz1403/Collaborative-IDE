import { IUser } from "@/interfaces/IUser";
import { Request, Response, NextFunction } from "express";

type IRequest = Request & {currentUser: IUser}; 
type IResponse = Response;
type INextFunction = NextFunction;

export {IRequest, IResponse, INextFunction}
import { IToken } from "@/interfaces/IToken";
import { Request, Response, NextFunction } from "express";

type IRequest = Request & {currentUser: IToken}; 
type IResponse = Response;
type INextFunction = NextFunction;

export {IRequest, IResponse, INextFunction}
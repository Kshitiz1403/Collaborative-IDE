import { IToken } from "@/interfaces/IToken";
import { Request, Response, NextFunction } from "express";

type IRequest = Request & {currentUser: IToken}; 
type IResponse = Response;
type INextFunction = NextFunction;
type IFileRequest = Request & { username: string; project_name: string }

export {IRequest, IResponse, INextFunction, IFileRequest}
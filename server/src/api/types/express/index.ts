import { IProject } from '@/interfaces/IProject';
import { IToken } from '@/interfaces/IToken';
import { Request, Response, NextFunction } from 'express';

type IRequest = Request & { currentUser: IToken };
type IResponse = Response;
type INextFunction = NextFunction;
type IProjectRequest = Request & { username: string; project: IProject };

export { IRequest, IResponse, INextFunction, IProjectRequest };

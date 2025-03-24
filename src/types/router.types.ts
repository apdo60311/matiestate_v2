import { RequestHandler } from "express";

export interface IRoute {
    path: string;
    method: 'get' | 'post' | 'put' |'patch'| 'delete' ;
    middlewares?: RequestHandler[];
    handler: RequestHandler<any, any, any, any, any>;
}

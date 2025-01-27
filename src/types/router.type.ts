import { RequestHandler } from "express";

export interface IRoute {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' ;
    handler: RequestHandler<any, any, any, any, any>;
}

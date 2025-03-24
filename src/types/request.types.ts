import { Request } from "express";

export interface User {
  id: number;
  account_id: number;
  tenant_id: number;
  member_id: number;
  card_type: number;
}

/*

    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>,


*/
export interface CustomRequest<P, R, B, Q, L extends Record<string, any>> extends Request<P, R, B, Q, L> {
  user?: User;
}

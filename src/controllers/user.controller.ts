import { NextFunction, RequestHandler, Response, Request } from "express";
import { CustomRequest } from "@/types/request.types";
import ResponseModel from "@/types/response.types";
import {
    ISendSmsBody,
    IVerifyTokenBody,
    ISignUpBody,
    ILoginBody,
    IForgetPasswordBody
} from "@/types/user.types"


export const sendSmsController
: RequestHandler<
unknown, 
ResponseModel<Record<string, any>>, 
ISendSmsBody, 
unknown, 
any
> = async (
    req : CustomRequest<unknown, ResponseModel<Record<string,any>>, ISendSmsBody, unknown, any>,
    res : Response<ResponseModel<Record<string,any>>>,
  next : NextFunction
): Promise<any> =>
     {
  try {
    res.status(200).send({
      success: true,
      message: "Token Send successfully",
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const verifyTokenController : RequestHandler<
unknown, 
ResponseModel<Record<string, any>>, 
IVerifyTokenBody, 
unknown, 
any
> = async (
    req : CustomRequest<unknown, ResponseModel<Record<string,any>>, ISendSmsBody, unknown, any>,
    res : Response<ResponseModel<Record<string,any>>>,
  next : NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
        success: true,
        message: "Token Verified successfully",
        data: { access_token: "testToken" } 
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const singUpController : RequestHandler<unknown, 
ResponseModel<Record<string, any>>, 
ISignUpBody, 
unknown, 
any
> = async (
    req : CustomRequest<unknown, ResponseModel<Record<string,any>>, ISignUpBody, unknown, any>,
    res : Response<ResponseModel<Record<string,any>>>,
  next : NextFunction
): Promise<any> => {
  try {
    return res.send({
      success: true,
      message: "Successfully registered",
      data: { access_token: "testToken", user: { name: "testUser" } },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const loginController : RequestHandler<
unknown, 
ResponseModel<Record<string, any>>, 
ILoginBody, 
unknown, 
any
> = async (
    req : CustomRequest<unknown, ResponseModel<Record<string,any>>, ILoginBody, unknown, any>,
    res : Response<ResponseModel<Record<string,any>>>,
  next : NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Successfully logged in",
      data: { access_token: "testToken", user: { name: "testUser" } },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const forgetPasswordController : RequestHandler<
unknown, 
ResponseModel<Record<string, any>>, 
IForgetPasswordBody, 
unknown, 
any
> = async (
    req : CustomRequest<unknown, ResponseModel<Record<string,any>>, IForgetPasswordBody, unknown, any>,
    res : Response<ResponseModel<Record<string,any>>>,
  next : NextFunction
): Promise<any> => {
  try {

    return res.status(200).send({
      success: true,
      message: "Successfully reset the password",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
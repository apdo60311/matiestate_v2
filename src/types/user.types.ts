export interface ISendSmsBody {
    phone_number: string;
}

export interface IVerifyTokenBody {
    phone_number: string;
    token: string;
}
export interface ISignUpBody {
    password: string;
    fcm_token: string;
}

export interface ILoginBody {
  phone_number: string;
  password: string; 
  fcm_token: string;
}

export interface IForgetPasswordBody {
    oldPassword: string;
    newPassword: string;
}

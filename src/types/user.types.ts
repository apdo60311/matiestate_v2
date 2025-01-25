interface ISendSmsBody {
    phone_number: string;
}

interface IVerifyTokenBody {
    phone_number: string;
    token: string;
}
interface ISignUpBody {
    password: string;
    fcm_token: string;
}

interface ILoginBody {
  phone_number: string;
  password: string; 
  fcm_token: string;
}

interface IForgetPasswordBody {
    oldPassword: string;
    newPassword: string;
}

export {
    ISendSmsBody,
    IVerifyTokenBody,
    ISignUpBody,
    ILoginBody,
    IForgetPasswordBody
}
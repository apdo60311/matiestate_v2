export interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T | null;
  error?: any;
  errors?: Array<any>;
  statusCode?: number;
}

export interface PaginatedResponse<T> extends BaseResponse<T> {
  page?: number;
  limit?: number;
  total?: number;
}

export interface AuthResponse
  extends BaseResponse<{
    access_token: string;
    user: any;
  }> {}

type ResponseModel<T> = BaseResponse<T> | PaginatedResponse<T> | AuthResponse;

export default ResponseModel;

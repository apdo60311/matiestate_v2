interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T | null;
  error?: any;
  statusCode?: number;
}

interface PaginatedResponse<T> extends BaseResponse<T> {
  page?: number;
  limit?: number;
  total?: number;
}

interface AuthResponse
  extends BaseResponse<{
    access_token: string;
    user: any;
  }> {}

type ResponseModel<T> = BaseResponse<T> | PaginatedResponse<T> | AuthResponse;

export default ResponseModel;

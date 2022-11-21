import {AxiosError} from 'axios';
import {appConstants} from  '../constants/const'
 import * as Yup from 'yup';


export const createAppError = (type: any, error: any, appErrorCode: any) => {
  if (type === 'APP_ERROR') {
    if (appErrorCode) {
      return {
        code: appErrorCode,
        message: error.message,
        detail: error.stack,
      };
    }
    return {
      code: appConstants.APP_CODE.COMMON_ERROR_CODE, //Mac dinh cua Error cua app
      message: error.message,
      detail: error.stack,
    };
  }
  if (error.message === 'Network Error') {
    return {
      code: appConstants.APP_CODE.COMMON_ERROR_CODE,
      message: 'network_error',
      detail: error.stack,
    };
  }
  const {isAxiosError} = error as AxiosError;
  if (isAxiosError) {
    //La loi cua axios
    const {response} = error as AxiosError;
    if (response) {
      switch (response.status) {
        case 400:
          return {
            code: appConstants.API_STATUS_CODE.BAD_REQUEST,
            message: 'error_call_api',
            detail: error.stack,
          };
        case 401:
          //   if (response.config.url !== API_METHOD.MS_AUTH.LOGIN) {
          //     // store.dispatch(showDialog());
          //     return {
          //       code: appConstants.API_STATUS_CODE.UNAUTHORIZED,
          //       message: translate('local_timeout'),
          //       detail: error.stack,
          //     };
          //   }
          return {
            code: appConstants.API_STATUS_CODE.UNAUTHORIZED,
            message: 'invalid_mail_or_password',
            detail: error.stack,
          };
        case 403:
          return {
            code: appConstants.API_STATUS_CODE.FORBIDDEN,
            message: 'forbidden_error',
            detail: error.stack,
          };
        case 404:
          return {
            code: appConstants.API_STATUS_CODE.NOT_FOUND,
            message: 'not_found_error',
            detail: error.stack,
          };
        case 408:
          return {
            code: appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
            message: 'request_time_out',
            detail: error.stack,
          };
        case 500:
          return {
            code: appConstants.API_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: 'error_call_api_500'
              ? 'error_call_api_500'
              : 'error_call_api_500',
            detail: error.stack,
          };

        default:
          return {
            code: response.status, //Mac dinh cua status cua response
            message: error.message,
            detail: JSON.stringify(error),
          };
      }
    }
  }

  return {
    code: appConstants.API_STATUS_CODE.INTERNAL_SERVER_ERROR, //Mac dinh cua Error cua API
    message: error.message,
    detail: error.stack,
  };
};

export const handleException = (error: unknown): void => {
  console.log(error);
};

export const LoginSchema = Yup.object().shape({
  acount: Yup.string().required('Tên đăng nhập đang rỗng *'),
  password: Yup.string().required("Mật khẩu đang rỗng *")
})
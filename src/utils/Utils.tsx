import { AxiosError } from "axios";
import { appConstants } from "../constants/const";
import * as Yup from "yup";

export const createAppError = (type: any, error: any, appErrorCode: any) => {
  if (type === "APP_ERROR") {
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
  if (error.message === "Network Error") {
    return {
      code: appConstants.APP_CODE.COMMON_ERROR_CODE,
      message: "network_error",
      detail: error.stack,
    };
  }
  const { isAxiosError } = error as AxiosError;
  if (isAxiosError) {
    //La loi cua axios
    const { response } = error as AxiosError;
    if (response) {
      switch (response.status) {
        case 400:
          return {
            code: appConstants.API_STATUS_CODE.BAD_REQUEST,
            message: "error_call_api",
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
            message: "invalid_mail_or_password",
            detail: error.stack,
          };
        case 403:
          return {
            code: appConstants.API_STATUS_CODE.FORBIDDEN,
            message: "forbidden_error",
            detail: error.stack,
          };
        case 404:
          return {
            code: appConstants.API_STATUS_CODE.NOT_FOUND,
            message: "not_found_error",
            detail: error.stack,
          };
        case 408:
          return {
            code: appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
            message: "request_time_out",
            detail: error.stack,
          };
        case 500:
          return {
            code: appConstants.API_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: "error_call_api_500"
              ? "error_call_api_500"
              : "error_call_api_500",
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
  acount: Yup.string().required("T??n ????ng nh???p ??ang r???ng *"),
  password: Yup.string().required("M???t kh???u ??ang r???ng *"),
});

export const updateInputSchema = Yup.object().shape({
  name: Yup.string().required("T??n nh?? h??ng ??ang r???ng *"),
  address: Yup.string().required("?????a ch??? ??ang r???ng *"),
  address_detail: Yup.string().required("?????a ch??? chi ti???t ??ang r???ng *"),
  discription: Yup.string().required("Mi??u t??? ??ang r???ng *"),
  price: Yup.string().required("Gi?? ??ang r???ng *"),
});

export const createVoucher = Yup.object().shape({
  name: Yup.string().min(6).required("T??n m?? khuy???n m??i ??ang r???ng *"),
  discription: Yup.string().min(6).required("Mi??u t??? voucher ??ang r???ng *"),
  code: Yup.string().required("M?? gi???m gi?? ??ang r???ng *"),
  percentDiscount: Yup.number().required("% ??ang r???ng *"),
  minPrice: Yup.number().required("Gi?? t???i thi???u ??ang r???ng *"),
  maxPrice: Yup.number().required("Gi?? t???i ??a ??ang r???ng *"),
  totalVoucher: Yup.number().required("T???ng s??? voucher ??ang r???ng *"),
});

export const validateCreateRestaurant = Yup.object().shape({
  name: Yup.string().min(3).required("T??n nh?? h??ng ??ang r???ng *"),
  address_detail: Yup.string().min(3).required("?????a ch??? chi ti???t ??ang r???ng *"),
  price: Yup.string().min(3).required("Gi?? ??ang r???ng *"),
})

export const validateCreateHotel = Yup.object().shape({
  name: Yup.string().min(3).required("T??n kh??ch s???n ??ang r???ng *"),
  address_detail: Yup.string().min(3).required("?????a ch??? chi ti???t ??ang r???ng *"),
  price: Yup.string().min(3).required("Gi?? ??ang r???ng *"),
})


export const editorConfiguration = {
    toolbar: {
      items: [
        "blockQuote",
        "bold",
        "imageTextAlternative",
        "link",
        "selectAll",
        "undo",
        "redo",
        "heading",
        "resizeImage:original",
        "resizeImage:25",
        "resizeImage:50",
        "resizeImage:75",
        "resizeImage",
        "imageResize",
        "imageStyle:full",
        "imageStyle:side",
        "imageUpload",
        "indent",
        "outdent",
        "italic",
        "numberedList",
        "bulletedList",
        "insertTable",
        "tableColumn",
        "tableRow",
        "mergeTableCells",
      ],

      shouldNotGroupWhenFull: true,
    },

    image: {
      styles: ["alignLeft", "alignCenter", "alignRight"],
      toolbar: [
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
        "|",
        "|",
        "imageTextAlternative",
      ],
    },

    ckfinder: {
      uploadUrl: 'http://206.189.37.26:8080/uploadImageCloud',
    },
  };
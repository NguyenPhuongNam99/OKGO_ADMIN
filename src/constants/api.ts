
const getFullMethod = (
  microServiceName: string,
  methodVersion: string,
  methodName: string,
): string => {
  return microServiceName + methodVersion + methodName;
};

const API_METHOD = {
  MS_AUTH: {
    Register: getFullMethod('v1/', 'auth/', 'register'),
    Login: getFullMethod('v1/', 'auth/', 'login'),
  },
  USER: {
    List_User: getFullMethod('v1/', 'user', ''),
  },
};

export default API_METHOD;

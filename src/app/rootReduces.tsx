import loginSlice from '../features/login/loginSlice';
import globalStore from '../globalStore';

const rootreducer = {
  loginState: loginSlice,
  globalStore,
};
export default rootreducer;

import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({
      name: '',
      email: '',
      picture: '',
      token: '',
    });
    try {
      await axiosPrivate.post('/users/auth/logout');
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;

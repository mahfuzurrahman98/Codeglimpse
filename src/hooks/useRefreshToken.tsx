import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.post('/users/auth/refreshtoken');
      console.log(response);
      const data = response.data.data;

      setAuth({
        name: data.user.name,
        email: data.user.email,
        token: data.access_token,
      });

      return data.access_token;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return refresh;
};

export default useRefreshToken;
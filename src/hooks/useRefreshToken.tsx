import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.post('/users/auth/refreshtoken');
      // console.log(response);
      const data = response.data.data;

      setAuth({
        name: data.user.name,
        email: data.user.email,
        picture: localStorage.getItem('picture') || '',
        token: data.access_token,
      });

      return data.access_token;
    } catch (error) {
      console.log('error from useRefreshToken.tsx', error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;

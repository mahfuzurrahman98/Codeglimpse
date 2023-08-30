import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState<string>('');
  const { setAuth } = useAuth();

  const login = async (code: string) => {
    try {
      const response = await axios.post('/users/auth/google-login', { code });
      const user = response.data.data.user;
      const accessToken = response.data.data.access_token;

      let localData = JSON.parse(localStorage.getItem('data'));
      localData.callbackSuccess = true;
      localStorage.setItem('data', JSON.stringify(localData));
      localStorage.removeItem('data');

      setAuth({
        name: user.name,
        email: user.email,
        token: accessToken,
      });
    } catch (error: any) {
      setErrMsg(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const code = searchParams.get('code') || '';
      console.log('Code:', code);
      await login(code);
    })();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default LoginCallback;

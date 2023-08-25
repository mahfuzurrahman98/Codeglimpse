import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const LoginCallback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState<string>('');
  const { setAuth } = useAuth();

  const login = async (code: string) => {
    try {
      const response = await axios.post('/users/auth/google-login', { code });
      console.log(response.data);
      setUserInfo(response.data);
      const user = response.data.data.user;
      const accessToken = response.data.data.access_token;
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
      {errMsg !== '' ? (
        <div>{errMsg}</div>
      ) : (
        <div>{JSON.stringify(userInfo)}</div>
      )}
    </div>
  );
};

export default LoginCallback;

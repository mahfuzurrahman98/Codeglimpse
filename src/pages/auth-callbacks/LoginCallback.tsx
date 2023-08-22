import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

const LoginCallback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState<string>('');

  const login = async (code: string) => {
    try {
      const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const client_secret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
      const redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_LOGIN_URI;

      const data = {
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code',
      };

      console.log(data);

      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        data
      );

      if (response.status === 200) {
        const access_token = response.data.access_token;

        const userinfo_response = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log(userinfo_response.data);
        if (userinfo_response.status === 200) {
          const userinfo = userinfo_response.data;
          setUserInfo(userinfo);
        } else {
          throw new Error('Failed to fetch user info');
        }
      } else {
        throw new Error('Google OAuth login failed');
      }
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

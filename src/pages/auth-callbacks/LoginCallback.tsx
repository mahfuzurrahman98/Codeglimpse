import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState<string>('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const login = async (code: string) => {
    try {
      const response = await axios.post('/users/auth/google-login', { code });
      const user = response.data.data.user;
      const accessToken = response.data.data.access_token;

      let localData = JSON.parse(localStorage.getItem('data') || '{}');
      localData['message'] = response.data.detail;
      localStorage.setItem('data', JSON.stringify(localData));

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
      if (code != '') {
        await login(code);

        let localData = JSON.parse(localStorage.getItem('data') || '{}');
        toast.success(localData.message);
        localStorage.removeItem('data');
      } else {
        navigate('/');
      }
    })();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default LoginCallback;

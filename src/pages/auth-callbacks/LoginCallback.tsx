import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const ErrMsg = ({ errMsg }: { errMsg: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col gap-y-3">
        <div>
          <p className="font-bold">Error!</p>
          <p className="">{errMsg}</p>
        </div>
        <div>
          <Link
            className="px-4 py-1 text-white rounded hover:bg-gray-600 bg-black"
            to={'/'}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

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
        picture: user.picture,
        token: accessToken,
      });
      localStorage.setItem('picture', user.picture);
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

  return <>{errMsg ? <ErrMsg errMsg={errMsg} /> : <Loading />}</>;
};

export default LoginCallback;

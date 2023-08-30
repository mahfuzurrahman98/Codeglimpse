import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useRefreshToken from '../hooks/useRefreshToken';
import Loading from './Loading';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const logout = useLogout();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    let localData = JSON.parse(localStorage.getItem('data'));
    if (localData.success) {
      toast.success(
        localData.from == 'signin'
          ? 'Login successfull'
          : 'Welcome to Codeglimpse'
      );
    }
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />
      {isLoading ? <Loading /> : <Outlet />}
    </>
  );
};

export default PersistLogin;

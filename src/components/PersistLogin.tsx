import { useEffect, useState } from 'react';
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

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        // isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    // cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`);
    // console.log(`aT: ${JSON.stringify(auth?.token)}`);
  }, [isLoading]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;

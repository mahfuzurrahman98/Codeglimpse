import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';

type Props = {};

const Navbar: FC<Props> = () => {
  const [smallDevice, setSmallDevice] = useState<boolean>(false);
  useEffect(() => setSmallDevice(true), []);
  const { auth, setAuth } = useAuth();

  const logout = () => {
    setAuth({
      name: '',
      email: '',
      token: '',
    });

    try {
      axios.post('/logout').then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="mt-5">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            className="w-[50px] lg:w-[70px] mr-3"
            alt="Bikri Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => setSmallDevice(!smallDevice)}
          className="inline-flex items-center p-2 text-3xl text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          @
        </button>
        <div
          className={`w-full lg:block lg:w-auto rounded mt-2 lg:mt-0 ${
            smallDevice ? 'hidden' : ''
          }`}
        >
          <ul className="flex flex-col py-4 px-3 lg:p-0 lg:flex-row lg:space-x-10  lg:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 text-black font-semibold rounded lg:p-0"
                aria-current="page"
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                to="/snippets/create"
                className="block py-2 text-black font-semibold rounded lg:p-0"
                aria-current="page"
              >
                Create
              </Link>
            </li>

            {auth.token == '' ? (
              <>
                <li className="block py-3 text-gray-600 lg:p-0 lg:hidden">
                  <Link
                    to="/login"
                    className="bg-[#FFFFF] text-black border-2 border-gray-400 rounded-lg font-bold px-4 py-2 hover:bg-gray-800 hover:text-white hover:border-gray-800"
                  >
                    Login
                  </Link>
                </li>
                <li className="block py-4 text-gray-600  lg:p-0 lg:hidden">
                  <Link
                    to="/register"
                    className="bg-[#000] text-white rounded-lg px-4 py-3 hover:bg-gray-600"
                  >
                    Start Free Trial
                  </Link>
                </li>
              </>
            ) : (
              <li className="block py-3 text-gray-600 lg:p-0 lg:hidden">
                <button
                  onClick={logout}
                  className="bg-[#FFFFF] text-black border-2 border-gray-400 rounded-lg font-bold px-4 py-2 hover:bg-gray-800 hover:text-white hover:border-gray-800"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="hidden lg:flex lg:gap-x-3 lg:items-center">
          {auth.token == '' ? (
            <>
              <Link
                to="/login"
                className="bg-[#FFFFF] text-black border-2 border-gray-400 rounded-lg font-bold px-10 py-2 hover:bg-gray-800 hover:text-white hover:border-gray-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#000] text-white font-bold border-2 border-black rounded-lg px-10 py-2 hover:bg-gray-600 hover:border-gray-600"
              >
                Start Free Trial
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-[#FFFFF] text-black border-2 border-gray-400 rounded-lg font-bold px-10 py-2 hover:bg-gray-800 hover:text-white hover:border-gray-800"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

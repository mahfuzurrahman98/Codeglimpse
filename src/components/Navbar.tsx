import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/circle-user.svg';
import CodeBranchIcon from '../assets/code-branch.svg';
import GoogleIcon from '../assets/google.svg';
import PlusIcon from '../assets/plus.svg';
import Logo from '../assets/terminal.svg';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import SearchBox from './SearchBox';

const Navbar: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { auth } = useAuth();
  const _logout = useLogout();

  const _login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_LOGIN_URI
    }&response_type=code&scope=openid%20profile%20email`;
    console.log(googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const logout = async () => {
    try {
      await _logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow px-3 lg:px-0">
      <nav className="w-full flex justify-between items-center mx-auto h-16 max-w-4xl">
        <div className="">
          <Link className="" to="/">
            <div className="">
              <img src={Logo} alt="" className="w-8" />
            </div>
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            to="/p/new"
            className="flex items-center gap-x-1 py-2 px-3 hover:bg-gray-200 rounded-full"
          >
            <span>
              <img src={PlusIcon} className="w-5" alt="" />
            </span>
            <span>New</span>
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            to="/p/library"
            className="flex items-center gap-x-1 py-2 px-3 hover:bg-gray-200 rounded-full"
          >
            <span>
              <img src={CodeBranchIcon} className="w-4" alt="" />
            </span>
            <span>Library</span>
          </Link>
        </div>

        <div className="hidden md:block justify-start px-2 w-1/2">
          <SearchBox />
        </div>

        {auth.token != '' ? (
          <div className="flex justify-end items-center relative">
            <div className="flex items-center">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg focus:outline-none"
              >
                <img
                  src={UserIcon}
                  className="block flex-grow-0 flex-shrink-0 w-8 p-1"
                  alt="User Icon"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-40 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <Link
                    to="/me"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-end items-center relative">
            <div className="flex items-center">
              {/* <Link
                to="/login"
                className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg focus:outline-none"
              >
                <span className="block flex-grow-0 flex-shrink-0 w-8 p-1">
                  Login
                </span>
              </Link> */}
              <a
                href="/login"
                className="flex items-center relative px-2 py-1 rounded-full border hover:shadow-lg focus:outline-none"
                onClick={_login}
              >
                <img src={GoogleIcon} alt="" width={20} />
                <span className="ml-2">Login</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
// import UserIcon from '../assets/circle-user.svg';
import CodeBranchIcon from '../assets/code-branch.svg';
import PlusIcon from '../assets/plus.svg';
import Logo from '../assets/terminal.svg';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import SearchBox from './SearchBox';

const Navbar: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { auth } = useAuth();
  const logout = useLogout();

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
                className="inline-flex items-center relative p-1 border rounded-full hover:shadow-lg focus:outline-none"
              >
                <img
                  src={auth.picture}
                  className="block flex-grow-0 flex-shrink-0 w-8 rounded-full"
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
          <div className="flex justify-end items-center">
            <div className="flex items-center">
              <Link
                to="/signin"
                className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

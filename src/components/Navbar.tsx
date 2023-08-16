import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/circle-user.svg';
import CodeBranchIcon from '../assets/code-branch.svg';
import SearchIcon from '../assets/magnifying-glass.svg';
import PlusIcon from '../assets/plus.svg';
import Logo from '../assets/terminal.svg';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Navbar: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { auth } = useAuth();
  const _logout = useLogout();

  const logout = async () => {
    try {
      await _logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow px-3 lg:px-0">
      <nav className="w-full flex justify-between items-center mx-auto h-16 max-w-5xl">
        <div className="">
          <Link className="" to="/">
            <div className="">
              <img src={Logo} alt="" className="w-8" />
            </div>
          </Link>
        </div>

        <div className="flex mr-4 items-center">
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

        <div className="flex mr-4 items-center">
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

        <div className="hidden md:block flex-shrink flex-grow-0 justify-start px-2">
          <div className="items-center max-w-full b-red-500 relative">
            <input
              className="border-2 rounded-2xl border-black pl-4 py-1 pr-10"
              placeholder="Search snippets by title, or tags"
            />
            <img
              src={SearchIcon}
              className="w-5 absolute top-0 right-0 mt-2 mr-3 pointer-events-none"
            />
          </div>
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
                <div className="absolute right-0 mt-40 w-48 bg-white border rounded-lg shadow-lg">
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
              <Link
                to="/login"
                className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg focus:outline-none"
              >
                <span className="block flex-grow-0 flex-shrink-0 w-8 p-1">
                  Login
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

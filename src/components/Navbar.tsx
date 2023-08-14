import { FC, useEffect, useState } from 'react';
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

  useEffect(() => {
    document.addEventListener('click', () => {
      console.log(isDropdownOpen);
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    });
  }, []);

  return (
    <nav className=" bg-white shadow w-full flex relative justify-between items-center mx-auto px-8 h-16 max-w-[800px]">
      <div className="inline-flex">
        <Link className="" to="/">
          <div className="">
            <img src={Logo} alt="" className="w-8" />
          </div>
        </Link>
      </div>

      <div className="flex mr-4 items-center">
        <Link
          to="/create"
          className="flex items-center gap-x-1 py-2 px-3 hover:bg-gray-200 rounded-full"
        >
          <span>
            <img src={PlusIcon} className="w-5" alt="" />
          </span>
          <span>New</span>
        </Link>
      </div>

      <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
        <div className="inline-block">
          <div className="items-center max-w-full b-red-500 relative">
            <input
              className="border-[3px] rounded-3xl border-black pl-4 py-1 pr-10"
              placeholder="Start your search"
            />
            <img
              src={SearchIcon}
              className="w-5 absolute top-0 right-0 mt-2 mr-3 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="flex mr-4 items-center">
            <Link
              to="/library"
              className="flex items-center gap-x-1 py-2 px-3 hover:bg-gray-200 rounded-full"
            >
              <span>
                <img src={CodeBranchIcon} className="w-4" alt="" />
              </span>
              <span>Library</span>
            </Link>
          </div>

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
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

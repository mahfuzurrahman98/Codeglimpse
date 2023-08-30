import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '../assets/google.svg';
import useLogin from '../hooks/useLogin';
import RootLayout from './RootLayout';

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const login = useLogin();

  useEffect(() => {
    openModal();
  }, []);

  return (
    <RootLayout>
      <div className="">
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-3">
            <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-2xl">
              <div className="border-b mb-5">
                <h2 className="text-xl font-bold mb-4">Join Codeglimpse!</h2>
              </div>

              <p className="text-gray-700">
                Please continue with your Google account to register.
              </p>

              <button
                className="flex items-center px-3 py-2 rounded-2xl text-white bg-black hover:bg-gray-700 mt-5"
                onClick={login}
              >
                <img src={GoogleIcon} alt="" width={20} />
                <span className="ml-2">Sign up with Google</span>
              </button>

              <p className="mt-3">
                <span>Already have an account?</span>
                <span className="ml-1">
                  <Link to="/signin" className="text-blue-600">
                    Sign in
                  </Link>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default Register;

import { Link } from 'react-router-dom';
import Logo from '../assets/terminal.svg';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="rounded flex flex-col justify-center text-center">
        <h2 className="text-3xl font-semibold mb-4">404 | Not found</h2>
        <p className="text-gray-200 mb-4">
          The page you are looking for is not valid.
        </p>

        <Link
          to="/"
          className="flex justify-center items-center gap-x-2 bg-white  py-1 text-black rounded"
        >
          <span>
            <img src={Logo} className="w-4" alt="" />
          </span>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

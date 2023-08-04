import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { auth } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="flex">
        {auth.name} - {auth.email} - {auth.token}N Home
      </div>
    </div>
  );
};

export default Home;

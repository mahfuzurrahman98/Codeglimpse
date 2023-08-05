import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { auth } = useAuth();
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <div className="flex">
        {auth.name} - {auth.email} - {auth.token}
      </div>
    </div>
  );
};

export default Home;

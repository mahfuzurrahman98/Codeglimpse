import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { auth } = useAuth();
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <div className="flex">
        {auth.token !== '' ? (
          <p>Hello {auth.name}, Greetings from Noobs Pastebin </p>
        ) : (
          <p>Greetings from Noobs Pastebin, Please Login to continue</p>
        )}
      </div>
    </div>
  );
};

export default Home;

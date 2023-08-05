import { useEffect } from 'react';
import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';
import Router from './router/Index';

function App() {
  useEffect(() => {
    // let x = 0;
    // setInterval(() => {
    //   console.log(`Hello from setTimeout for ${x++} times`);
    // }, 3000);
  }, []);
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;

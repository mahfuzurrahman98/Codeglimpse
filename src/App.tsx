import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';
import Router from './router/Index';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;

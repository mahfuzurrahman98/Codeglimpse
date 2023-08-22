import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;

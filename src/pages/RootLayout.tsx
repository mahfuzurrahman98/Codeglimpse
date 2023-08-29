import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-4xl w-full mt-5 flex flex-col mx-auto gap-y-5 px-3 lg:px-0">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;

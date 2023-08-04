import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <div>Footer</div>
    </div>
  );
};

export default RootLayout;

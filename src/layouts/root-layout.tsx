import Header from '@src/components/header/heder';
import './root-layout.css';
import { Outlet } from 'react-router-dom';
import Footer from '@src/components/footer/footer';

const RootLayout = (): JSX.Element => {
  return (
    <div className="root-layout-wrapper">
      <Header />
      <main className="root-layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

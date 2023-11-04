import './root-layout.css';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = (): JSX.Element => {
  return (
    <div className="root-layout-wrapper">
      <header className="root-header">
        <nav>
          <h1>Rick and Morty WORLD</h1>
          <div className="header-menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="characters">Characters</NavLink>
            <NavLink to="locations">Locations</NavLink>
            <NavLink to="episodes">Episodes</NavLink>
            <NavLink to="about">About</NavLink>
          </div>
        </nav>
      </header>
      <main className="root-layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

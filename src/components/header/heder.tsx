import { NavLink } from 'react-router-dom';
import './header.css';

const Header = (): JSX.Element => {
  return (
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
  );
};

export default Header;

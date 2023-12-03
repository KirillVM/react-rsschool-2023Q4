
import { Inter } from 'next/font/google';
import './root-layout.css';
import Link from 'next/link';
type LayoutProps = {
  children: JSX.Element;
}

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({children}: LayoutProps ): JSX.Element => {
  return (
    <div className="root-layout-wrapper">
      <header className="root-header">
        <nav>
          <h1>Rick and Morty WORLD</h1>
          <div className="header-menu">
            <Link href="/">Home</Link>
            <Link href="/catalog/characters">Characters</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/episodes">Episodes</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </header>
      <main className="root-layout-main">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;

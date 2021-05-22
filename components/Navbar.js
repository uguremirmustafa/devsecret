import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import AuthContext from '../stores/authContext';

export default function Navbar() {
  const { user, login, logout, authReady } = useContext(AuthContext);

  return (
    <div className="container">
      <nav>
        <h1>Devugur Secrets</h1>
        {/* {authReady && ( */}
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/guides">
              <a>Secrets</a>
            </Link>
          </li>

          {!user && (
            <li onClick={login} className="btn">
              Login/Signup
            </li>
          )}
          {user && <li>{user.email}</li>}
          {user && (
            <li onClick={logout} className="btn">
              Logout
            </li>
          )}
        </ul>
        {/* )} */}
      </nav>
      <div className="banner">
        <Image src="/banner.jpg" width={640} height={409} />
      </div>
    </div>
  );
}

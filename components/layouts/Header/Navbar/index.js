import {useContext} from 'react';
import { firebaseContext } from "fb/index";
import Link from "next/link";
import styles from './Navbar.module.scss';

const Navbar = () => {

  const { user } = useContext(firebaseContext);

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/popular">
        <a>Populares</a>
      </Link>
      {user ? (
        <Link href="/newproduct">
          <a>Nuevo Producto</a>
        </Link>
      ) : null}
    </nav>
  );
};

export default Navbar;

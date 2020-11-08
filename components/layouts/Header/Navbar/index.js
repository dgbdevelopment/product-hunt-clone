import Link from "next/link";
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/popular">
        <a>Populares</a>
      </Link>
      <Link href="/newproduct">
        <a>Nuevo Producto</a>
      </Link>
    </nav>
  );
};

export default Navbar;

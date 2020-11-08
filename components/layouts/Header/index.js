import SearchForm from 'components/layouts/Header/SearchForm';
import styles from './Header.module.scss';
import Link from "next/link";
import Navbar from './Navbar';
import UserPanel from './UserPanel';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.leftSide}>
          <Link href="/">
            <a>
              <p className={styles.header__logo}>P</p>
            </a>
          </Link>
          <SearchForm />
          <Navbar />
        </div>
        <UserPanel />
      </div>
    </header>
  );
};

export default Header;

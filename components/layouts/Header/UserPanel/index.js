import styles from "./UserPanel.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { firebaseContext } from "fb/index";


const UserPanel = () => {

  const { user, firebase } = useContext(firebaseContext);
  
  const handleClick = async e => {
    try {
      await firebase.logOut();
    } catch (error) {
      console.error('Hubo un error al cerra sesión:', error.message)
    }
  }
  
  return (
    <div className={styles.userPanel}>
      {user ? (
        <>
          <p>Hola: {user.displayName}</p>
          <button type="button" className={styles["btn-orange"]} onClick={handleClick}>
            Cerrar
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className={styles["btn-blank"]}>
              Login
            </a>
          </Link>
          <Link href="/register">
            <a className={styles["btn-orange"]}>
              Registro
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserPanel;

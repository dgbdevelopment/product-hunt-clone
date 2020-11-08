import styles from "./UserPanel.module.scss";
import Link from "next/link";

const UserPanel = () => {
  const user = false;

  const handleClick = e => console.log('Has cerrado sesión')
  
  return (
    <div className={styles.userPanel}>
      {user ? (
        <>
          <p>Hola: David</p>
          <button type="button" className={styles["btn-orange"]}>
            Cerrar
          </button>
        </>
      ) : (
        <>
          <Link href="/">
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

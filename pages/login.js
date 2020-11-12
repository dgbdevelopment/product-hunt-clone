import { useState } from "react";
import Router from "next/router";
import Layout from "../components/layouts/Layout";
import styles from "styles/ui/Form.module.scss";
import useValidation from "hooks/useValidation";
import firebase from "fb/index";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const [errorMsg, setErrorMsg] = useState(false);

  const loginAccount = async () => {
    try {
      const user = await firebase.login(email, password);
      setErrorMsg(false);
      setValues(initialState);
      Router.push("/");
    } catch (error) {
      setErrorMsg("Hubo un error: " + error.message);
    }
  };

  const {
    values,
    errors,
    submit,
    setValues,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(initialState, loginAccount);

  const { email, password } = values;

  return (
    <Layout title={"Login"}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1>Iniciar Sesión</h1>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="current-email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
          />
          {errors?.email ? <p>{errors.email}</p> : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={password}
          />
          {errors?.password ? <p>{errors.password}</p> : null}
          {errorMsg ? <p>{errorMsg}</p> : null}
        </div>
        <button
          type="submit"
          className={`${styles["btn-orange"]} ${styles["btn-block"]} ${styles.submit}`}
          disabled={submit ? true : false}
        >
          Iniciar Sesión
        </button>
      </form>
    </Layout>
  );
}

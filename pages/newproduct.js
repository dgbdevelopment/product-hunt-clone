import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import Layout from "../components/layouts/Layout";
import styles from "styles/ui/Form.module.scss";
import useValidation from "hooks/useValidation";
import { firebaseContext } from "fb/index";
import FileUploader from "react-firebase-file-uploader";

export default function NewProduct() {
  const initialState = {
    productname: "",
    company: "",
    url: "",
    imageURL: "",
    description: "",
  };

  const [errorMsg, setErrorMsg] = useState(false);

  const [imageState, setImageState] = useState({
    isUploading: false,
    progress: 0,
    error: false,
    filename: "",
    url: "",
  });
  const handleUploadStart = () =>
    setImageState({ ...imageState, isUploading: true, progress: 0 });
  const handleProgress = (progress) =>
    setImageState({ ...imageState, progress });
  const handleUploadError = (error) => {
    setImageState({ ...imageState, isUploading: false });
    console.error(error);
  };
  const handleUploadSuccess = (filename) => {
    setImageState({
      ...imageState,
      filename,
      progress: 100,
      isUploading: false,
    });
    firebase.storage
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        setImageState({ ...imageState, url, filename });
      });
  };

  const { firebase, user } = useContext(firebaseContext);
  const {
    values,
    errors,
    submit,
    setValues,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(initialState, createProduct);

  const { productname, company, url, description } = values;

  const product = {
    ...values,
    comments: [],
    votes: { count: 0, voters: [] },
    created_at: Date.now(),
    
  };

  async function createProduct() {
    try {
      await firebase.addProduct({
        ...product,
        imageURL: imageState.url,
        filename: imageState.filename,
        created_by: { id: user.uid, username: user.displayName },
      });
      setErrorMsg(false);
      setValues(initialState);
      Router.push("/");
    } catch (error) {
      setErrorMsg("Hubo un error: " + error.message);
    }
  }
  useEffect(() => {
    if (!user) Router.push("/login");
  }, []);

  return (
    <Layout title={"Nuevo Producto"}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1>Nuevo Producto</h1>
        <fieldset>
          <legend>Información General</legend>
          <div className={styles.formGroup}>
            <label htmlFor="productname">Nombre del producto</label>
            <input
              type="text"
              name="productname"
              id="productname"
              placeholder="Nombre del producto"
              autoComplete="new-productname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={productname}
            />
            {errors?.productname ? <p>{errors.productname}</p> : null}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="productname">Empresa</label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Empresa"
              autoComplete="new-company"
              onChange={handleChange}
              onBlur={handleBlur}
              value={company}
            />
            {errors?.company ? <p>{errors.company}</p> : null}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Imagen</label>
            <FileUploader
              accept="image/*"
              randomizeFilename
              name="image"
              id="image"
              storageRef={firebase.storage.ref("products")}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleProgress}
            />
            {imageState.url !== "" ? (
              <img src={imageState.url} alt="Miniatura" />
            ) : null}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="productname">URL</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="http://example.com"
              autoComplete="new-url"
              onChange={handleChange}
              onBlur={handleBlur}
              value={url}
            />
            {errors?.url ? <p>{errors.url}</p> : null}
          </div>
        </fieldset>
        <fieldset>
          <legend>Descripción del producto</legend>
          <div className={styles.formGroup}>
            <textarea
              name="description"
              id="description"
              placeholder="Describe tu producto..."
              autoComplete="new-description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={description}
            />
            {errors?.description ? <p>{errors.description}</p> : null}
            {errorMsg ? <p>{errorMsg}</p> : null}
          </div>
        </fieldset>
        <button
          type="submit"
          className={`${styles["btn-orange"]} ${styles["btn-block"]} ${styles.submit}`}
          disabled={submit ? true : false}
        >
          Añadir producto
        </button>
      </form>
    </Layout>
  );
}

import Router, { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { firebaseContext } from "fb/index";
import Layout from "components/layouts/Layout";
import Error404 from "components/layouts/Error404";
import styles from "./Id.module.scss";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Comment from "components/layouts/Comment";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [allowed, setAllowed] = useState(true);
  const [comment, setComment] = useState({});

  const { firebase, user } = useContext(firebaseContext);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          const result = await firebase.db.collection("products").doc(id).get();
          if (!result.data())
            throw new Error(`Producto con id ${id} no encontrado`);
          setProduct(result.data());
        } catch (error) {
          console.log(error.message);
          setError(error.message);
        }
      };
      getProduct();
    }
  }, [id]);

  const {
    productname,
    url,
    created_at,
    created_by,
    comments,
    description,
    imageURL,
    company,
    votes,
    filename
  } = product;

  const handleClickVote = () => {
    if (product.votes.voters.includes(user.uid)) return setAllowed(false);
    firebase.db
      .collection("products")
      .doc(id)
      .update({
        votes: { count: votes.count + 1, voters: [...votes.voters, user.uid] },
      })
      .then((res) =>
        setProduct({
          ...product,
          votes: {
            count: votes.count + 1,
            voters: [...votes.voters, user.uid],
          },
        })
      )
      .catch((err) => console.log(err.message));
  };
  const isOwner = () => {
    return user.uid === product.created_by.id;
  };

  const handleChangeComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleClickComment = (e) => {
    e.preventDefault();
    if (comment.commentText.trim() === "") return;
    setComment({
      ...comment,
      userId: user.uid,
      username: user.displayName,
      created_at: Date.now(),
    });
  };
  useEffect(() => {
    if (!comment.userId || !comment.username) return;
    firebase.db
      .collection("products")
      .doc(id)
      .update({ comments: [comment, ...comments] })
      .then((res) => {
        setProduct({ ...product, comments: [comment, ...comments] });
        setComment({});
      })
      .catch((err) => console.log(err.message));
  }, [comment.userId, comment.username]);

  const handleClickDelete = () => {
    firebase.db.collection('products').doc(id).delete()
      .then(() => firebase.storage.ref('products/'+filename).delete())
      .then(() => Router.push('/'))
      .catch(err => console.log(err.message))
  }

  return (
    <Layout>
      {error ? <Error404 message={error} /> : null}
      {product?.productname ? (
        <div className="container">
          <h1 className={styles.title}>{product.productname} </h1>
          <div className={styles.mainContainer}>
            <div className={styles.infoZone}>
              <img
                src={product.imageURL}
                alt={`Imagen de ${product.productname}`}
              />
            </div>
            <div className={styles.voteZone}>
              <p>
                Publicado hace{" "}
                {formatDistanceToNow(new Date(product.created_at), {
                  locale: es,
                })}
              </p>
              <p className={styles.by}>
                Por: <span>{product.created_by.username}</span> de{" "}
                <span>{product.company}</span>
              </p>
              <Link href={product.url}>
                <a
                  target="_blank"
                  className={`${styles["btn-orange"]} ${styles["btn-block"]}`}
                >
                  Visitar URL
                </a>
              </Link>

              <p className="text-center">
                {" "}
                <span>{product.votes.count}</span> Votos
              </p>
              {user && (
                <button
                  className={`${styles["btn-blank"]} ${styles["btn-block"]}`}
                  onClick={handleClickVote}
                >
                  {allowed ? "Votar" : "Ya has votado"}
                </button>
              )}
              <hr />
              <p>
                <span>Descripcion del producto:</span>
                <br />
                {product.description}
              </p>
              {user && isOwner() ? (
                <button
                  className={`${styles["btn-blank"]} ${styles["btn-block"]}`}
                  onClick={handleClickDelete}
                >
                  Eliminar producto
                </button>
              ) : null}
            </div>
          </div>
          <div className={styles.commentsZone}>
            {user && (
              <form className={styles.form}>
                <fieldset>
                  <legend>Deja tu comentario</legend>
                  <div className={styles.formGroup}>
                    <textarea
                      name="commentText"
                      id="commentText"
                      placeholder="Deja tu comentario"
                      onChange={handleChangeComment}
                      value={comment.commentText || ""}
                    />
                    <button
                      className={`${styles["btn-orange"]} ${styles["btn-block"]}`}
                      onClick={handleClickComment}
                    >
                      Añadir comentario
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
            <h2>Comentarios</h2>
            {product.comments.map((com, i) => (
              <Comment
                key={com.userId.concat(i)}
                comment={com}
                product={product}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className={styles.title}>Cargando...</h1>
      )}
    </Layout>
  );
};

export default ProductPage;

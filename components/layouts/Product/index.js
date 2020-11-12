import styles from './Product.module.scss';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Product = ({ product }) => {
  const { productname, url, created_at, comments, description, imageURL, company, votes, id } = product;
  return (
    <div className={styles.productContainer}>
      <div className={styles.leftSide}>
        <div className={styles.imgContainer}>
          <img src={imageURL} alt={`Imagen para ${productname}`} />
        </div>
        <div className={styles.infoContainer}>
          <Link href={`/product/${id}`}>
            <h1>{productname}</h1>
          </Link>
          <p>{description.substring(0, 80) + "..."}</p>
          <div className={styles.comments}>
            <img src="/static/img/comentario.png" alt="" />
            <span>{comments.length} Comentarios</span>
          </div>
          <p>
            Publicado hace{" "}
            {formatDistanceToNow(new Date(created_at), { locale: es })}
          </p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <img src="/static/img/like.png" alt="Icono de me gusta"/>
        <span>Votos</span>
        <span>{votes.count}</span>
      </div>
    </div>
  );
}
 
export default Product;
import styles from "./Comment.module.scss";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const Comment = ({ comment, product }) => {
  const { username, created_at, commentText, userId } = comment;

  const isOwner = () => {
    return userId === product.created_by.id;
  };

  return (
    <div className={styles.commentContainer}>
      <p>
        <span className={styles.authorContent}>
          <span>Comentario de <span className={styles.author}>{username}</span></span>
          {isOwner() && <span className={styles.owner}>Propietario</span>}
        </span>
      </p>
      <blockquote className={styles.comment}>
        &ldquo; {commentText} &rdquo;
      </blockquote>
      <p>
        Publicado hace{" "}
        {formatDistanceToNow(new Date(created_at), {
          locale: es,
        })}
      </p>
    </div>
  );
};

export default Comment;

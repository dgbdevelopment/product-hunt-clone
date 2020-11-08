import styles from './SearchForm.module.scss';

const SearchForm = () => {
  return (
    <form className={styles.form}>
      <input className={styles.inputText} type="text" name="query" placeholder="Buscar Productos"/>
      <button type="submit" className={styles.button}/>
    </form>
  );
};

export default SearchForm;

import styles from './SearchForm.module.scss';
import { useState } from 'react';
import Router from 'next/router';

const SearchForm = () => {

  const[query, setQuery]= useState('')

  const handleChange = e => {
    setQuery(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === "") return;
    Router.push({
      pathname: '/queries',
      query: {query: query}
    })
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.inputText} type="text" name="query" placeholder="Buscar Productos" value={query} onChange={handleChange}/>
      <button type="submit" className={styles.button}/>
    </form>
  );
};

export default SearchForm;

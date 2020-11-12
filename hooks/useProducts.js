import { useEffect, useState } from "react";
import firebase from "fb/index";

const useProducts = (orderBy, order) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = () => {
      firebase
        .getProducts(orderBy, order)
        .then((result) => setProducts(result))
        .catch((error) => setError(error.message));
    };
    loadProducts();
  }, []);

  return { products, error };
};

export default useProducts;

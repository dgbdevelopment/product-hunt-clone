import Layout from "../components/layouts/Layout";
import styles from "styles/Home.module.scss";
import Link from "next/link";
import {useRouter} from 'next/router';
import Product from "components/layouts/Product";
import useProducts from "hooks/useProducts";
import {useEffect, useState} from 'react';

export default function Queries() {
  const { products, error } = useProducts("created_at", "desc");

  const { query: { query } } = useRouter();

  const [found, setFound] = useState([]);

  useEffect(() => {
    if (!query || products?.length === 0) return;
    const regEx = new RegExp(query,'ig')
    const filter = products.filter(
      (product) =>
        regEx.test(product.description) ||
        regEx.test(product.productname) ||
        regEx.test(product.company) 
    );
    setFound(filter)
  },[query, products])


  return (
    <Layout title={"Búsqueda"}>
      {error ? (
        <div className="error">
          <p style={{ marginBottom: "2rem" }}>{error}</p>
          <Link href="/newproduct">
            <a className={styles["btn-orange"]}>Agregar producto</a>
          </Link>
        </div>
      ) : (
        <>
          {found.length === 0 ? (
            <p className="error">
              No se encontraron productos para la búsqueda {`"${query}"`}
            </p>
          ) : (
            <div className="product-list">
              <div className="container">
                <div className="bg-white">
                  {found?.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

import Layout from "../components/layouts/Layout";
import styles from 'styles/Home.module.scss';
import Link from 'next/link';
import Product from 'components/layouts/Product';
import useProducts from 'hooks/useProducts';

export default function Home() {

  const { products, error } = useProducts('created_at', 'desc');

  return (
    <Layout title={"Inicio"}>
      {error ? (
        <div className="error">
          <p style={{ marginBottom: "2rem" }}>{error}</p>
          <Link href="/newproduct">
            <a className={styles["btn-orange"]}>Agregar producto</a>
          </Link>
        </div>
      ) : (
        <div className="product-list">
          <div className="container">
            <div className="bg-white">
              {products?.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

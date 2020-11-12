import Layout from "../components/layouts/Layout";
import styles from "styles/Home.module.scss";
import Link from "next/link";
import Product from "components/layouts/Product";
import useProducts from "hooks/useProducts";

export default function Popular() {
  const { products, error } = useProducts("votes.count", "desc");

  return (
    <Layout title={"Populares"}>
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

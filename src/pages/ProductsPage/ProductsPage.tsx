import { useEffect } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { fetchProducts } from "@/shared/store/reducers/productsSlice";
import { ProductCard } from "@/entities/ProductCard";

import styles from "./index.module.scss";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, []);

  if (isLoading) {
    return (
      <div className="container container_centered">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className={`container ${styles.products}`}>
      <h1>Products</h1>
      {error && <p>{error}</p>}
      <div className={styles.products__list}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            thumbnailUrl={product.thumbnailUrl}
            isLiked={product.isLiked || false}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

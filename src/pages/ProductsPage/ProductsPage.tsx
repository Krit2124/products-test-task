import { useEffect } from "react";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { getProducts, setEmptyChosenProduct } from "@/shared/store/reducers/productsSlice";
import { ProductCard } from "@/entities/ProductCard";
import { useProductFilters } from "@/shared/hooks/useProductFilters";

import styles from "./index.module.scss";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  const { paginationProps } = useProductFilters({ initialPage: 1 });

  // Получаем первичные данные и обнуляем выбранный товар
  useEffect(() => {
    dispatch(getProducts(1));
    dispatch(setEmptyChosenProduct())
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
      <div className={styles.products__title}>
        <h1>Products</h1>
        <Link to="/create-product">
          <FontAwesomeIcon icon={faPlus} spin size="3x" />
        </Link>
      </div>
      
      {error && <p>{error}</p>}
      <div className={styles.products__list}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id || 1}
            title={product.title}
            thumbnailUrl={product.thumbnailUrl}
            isLiked={product.isLiked || false}
          />
        ))}
      </div>

      <ReactPaginate
        {...paginationProps}
        nextLabel=">"
        previousLabel="<"
        containerClassName={styles.pagination} // Класс для контейнера пагинации
        activeClassName={styles.pagination__active} // Класс для активной страницы
      />
    </div>
  );
};

export default ProductsPage;

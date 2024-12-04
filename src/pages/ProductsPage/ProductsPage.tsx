import { useEffect, useState } from "react";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import {
  getProducts,
  setEmptyChosenProduct,
} from "@/shared/store/reducers/productsSlice";
import { ProductCard } from "@/entities/ProductCard";
import { useProductFilters } from "@/shared/hooks/useProductFilters";

import styles from "./index.module.scss";
import { ButtonLike } from "@/shared/ui/ButtonLike";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const [isOnlyLikedProducts, setIsOnlyLikedProducts] = useState(false);
  const [searchString, setSearchString] = useState("");

  const { paginationProps, productsByFilters } = useProductFilters({
    initialPage: 1,
    products,
    isOnlyLikedProducts,
    searchString,
  });

  // Получаем первичные данные и обнуляем выбранный товар
  useEffect(() => {
    dispatch(getProducts(1));
    dispatch(setEmptyChosenProduct());
  }, []);

  // Обработка изменения строки поиска с применением debounce
  // (была бы сильно полезна, если бы фильтрация происходила на сервере)
  const handleSearchStringChange = (value: string, delay = 500) => {
    const debounceTimer = setTimeout(() => {
      setSearchString(value);
    }, delay);

    return () => clearTimeout(debounceTimer);
  };

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
        <div className={styles.products__title__buttons}>
          <input
            type="text"
            defaultValue={searchString}
            onChange={(e) => handleSearchStringChange(e.target.value)}
            className="input_default"
            placeholder="Search by title"
          />
          <ButtonLike
            isLiked={isOnlyLikedProducts}
            handleClick={() => setIsOnlyLikedProducts(!isOnlyLikedProducts)}
            title="Show only favorite products"
          />
          <Link
            to="/create-product"
            className="button_icon"
            title="Create new product"
          >
            <FontAwesomeIcon icon={faPlus} spin size="3x" />
          </Link>
        </div>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className={styles.products__list}>
            {productsByFilters.map((product) => (
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
        </>
      )}
    </div>
  );
};

export default ProductsPage;

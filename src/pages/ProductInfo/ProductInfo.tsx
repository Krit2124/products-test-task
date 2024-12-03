import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ButtonLike } from "@/shared/ui/ButtonLike";
import {
  deleteProduct,
  getProduct,
  likeProduct,
} from "@/shared/store/reducers/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import ButtonEdit from "@/shared/ui/ButtonEdit/ButtonEdit";
import { ButtonDelete } from "@/shared/ui/ButtonDelete";

import styles from "./index.module.scss";
import { ButtonGoBack } from "@/shared/ui/ButtonGoBack";

const ProductInfo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { chosenProduct, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  );

  // Получение товара по id
  useEffect(() => {
    if (id) {
      const idNumber = parseInt(id, 10);
      dispatch(getProduct(idNumber));
    }
  }, [id, dispatch]);

  // Обработка добавления/удаления из избранного
  const handleLike = useCallback(() => {
    dispatch(likeProduct(chosenProduct?.id || 1));
  }, [id]);

  // Обработка удаления товара
  function handleDelete() {
    // Условное удаление
    dispatch(deleteProduct(chosenProduct?.id || 1));
    window.location.replace("/products");
  }

  if (isLoading) {
    return (
      <div className="container container_centered">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (error) {
    return <div className="container container_centered">{error}</div>;
  }

  return (
    <div className={`container ${styles.product}`}>
      <div className={styles.product__pageTitle}>
        <ButtonGoBack />
        <h1>Product info</h1>
      </div>
      <div className={styles.product__info}>
        <div className={styles.product__info__title}>
          <h3>{chosenProduct?.title}</h3>
          <div className={styles.product__info__title__buttons}>
            <ButtonLike
              isLiked={chosenProduct?.isLiked || false}
              handleClick={handleLike}
            />
            <ButtonEdit link={`/edit-product/${id}`} />
            <ButtonDelete handleClick={handleDelete} />
          </div>
        </div>

        <p>id: {chosenProduct?.id}</p>
        <p>Album id: {chosenProduct?.albumId}</p>

        <img src={chosenProduct?.url} alt="product" />
      </div>
    </div>
  );
};

export default ProductInfo;

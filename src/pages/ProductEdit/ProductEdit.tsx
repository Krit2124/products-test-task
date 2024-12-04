import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { ButtonGoBack } from "@/shared/ui/ButtonGoBack";
import { ProductForm } from "@/features/ProductForm";
import { IProduct } from "@/shared/types/products";
import { editProduct, getProduct } from "@/shared/store/reducers/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";

import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProductEdit = () => {
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

  const handleSubmit = (product: Omit<IProduct, "id">) => {
    dispatch(editProduct(product))
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
        <h1>Product editing</h1>
      </div>
      <ProductForm product={chosenProduct} handleSubmit={handleSubmit}/>
    </div>
  );
};

export default ProductEdit;

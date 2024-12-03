import { ButtonGoBack } from "@/shared/ui/ButtonGoBack";
import { ProductForm } from "@/features/ProductForm";

import { IProduct } from "@/shared/types/products";
import { saveProduct } from "@/shared/store/reducers/productsSlice";
import { useAppDispatch } from "@/shared/hooks/redux";

import styles from "./index.module.scss";

const ProductCreate = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (product: Omit<IProduct, "id">) => {
    dispatch(saveProduct(product))
    window.location.replace("/products");
  }

  return (
    <div className={`container ${styles.product}`}>
      <div className={styles.product__pageTitle}>
        <ButtonGoBack />
        <h1>Product creation</h1>
      </div>
      <ProductForm product={null} handleSubmit={handleSubmit}/>
    </div>
  );
};

export default ProductCreate;

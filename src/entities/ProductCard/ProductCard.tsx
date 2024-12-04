import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import { ButtonLike } from "@/shared/ui/ButtonLike";
import { ButtonDelete } from "@/shared/ui/ButtonDelete";
import { useAppDispatch } from "@/shared/hooks/redux";
import {
  deleteProduct,
  likeProduct,
} from "@/shared/store/reducers/productsSlice";
import ButtonEdit from "@/shared/ui/ButtonEdit/ButtonEdit";

interface ProductCardProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  isLiked: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  thumbnailUrl,
  isLiked,
}) => {
  const dispatch = useAppDispatch();

  // Обработка удаления товара
  function handleDelete() {
    dispatch(deleteProduct(id));
  }

  // Обработка добавления/удаления из избранного
  function handleLike() {
    dispatch(likeProduct(id));
  }

  return (
    <Link to={`/products/${id}`} className={styles.card}>
      <h3>{title}</h3>
      <div className={styles.card__buttons}>
        <ButtonLike
          isLiked={isLiked || false}
          handleClick={handleLike}
          title={isLiked ? "Delete from favorites" : "Add to favorites"}
        />
        <ButtonEdit link={`/edit-product/${id}`} />
        <ButtonDelete handleClick={handleDelete} />
      </div>
      <img src={thumbnailUrl} alt="product" />
    </Link>
  );
};

export default ProductCard;

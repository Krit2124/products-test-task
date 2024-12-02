import { FC } from "react";

import styles from "./index.module.scss";
import { ButtonLike } from "@/shared/ui/ButtonLike";
import { ButtonDelete } from "@/shared/ui/ButtonDelete";

interface ProductCardProps {
  id: number;
  title: string,
  thumbnailUrl: string;
  isLiked: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ id, title, thumbnailUrl, isLiked }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <div className={styles.card__buttons}>
        <ButtonLike id={id} isLiked={isLiked}/>
        <ButtonDelete id={id} />
      </div>
      <img src={thumbnailUrl} alt="product" />
    </div>
  );
};

export default ProductCard;
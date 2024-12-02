import { FC } from "react";

import styles from "./index.module.scss";

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
      <div>
        <img src={thumbnailUrl} alt="product" />
      </div>
    </div>
  );
};

export default ProductCard;
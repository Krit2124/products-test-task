import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

import { useAppDispatch } from "@/shared/hooks/redux";
import { likeProduct } from "@/shared/store/reducers/productsSlice";

import styles from "./index.module.scss"

interface ButtonLikeProps {
  id: number;
  isLiked: boolean;
}

const ButtonLike: FC<ButtonLikeProps> = ({ id, isLiked }) => {
  const dispatch = useAppDispatch();
  
  function handleClick() {
    dispatch(likeProduct(id));
  }

  return (
    <button onClick={handleClick} className={styles.buttonLike}>
      <FontAwesomeIcon icon={isLiked ? faHeartFull : faHeartEmpty} size="2x"/>
    </button>
  );
};

export default ButtonLike;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "@/shared/hooks/redux";
import { deleteProduct } from "@/shared/store/reducers/productsSlice";

import styles from "./index.module.scss"

interface ButtonDeleteProps {
  id: number;
}

const ButtonDelete: FC<ButtonDeleteProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  
  function handleClick() {
    dispatch(deleteProduct(id));
  }

  return (
    <button onClick={handleClick} className={styles.buttonDelete}>
      <FontAwesomeIcon icon={faTrash} size="2x"/>
    </button>
  );
};

export default ButtonDelete;
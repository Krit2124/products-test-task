import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ButtonDeleteProps {
  handleClick: VoidFunction;
}

const ButtonDelete: FC<ButtonDeleteProps> = ({ handleClick }) => {
  const handleClickWithoutDefaultAction = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <button
      onClick={(event) => handleClickWithoutDefaultAction(event)}
      className="button_icon"
      title="Delete"
    >
      <FontAwesomeIcon icon={faTrash} size="3x" />
    </button>
  );
};

export default ButtonDelete;

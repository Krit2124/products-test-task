import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface ButtonLikeProps {
  isLiked: boolean;
  title: string;
  handleClick: VoidFunction;
}

const ButtonLike: FC<ButtonLikeProps> = ({ isLiked, title, handleClick }) => {
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
      title={title}
    >
      <FontAwesomeIcon icon={isLiked ? faHeartFull : faHeartEmpty} size="3x" />
    </button>
  );
};

export default ButtonLike;

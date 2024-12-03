import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface ButtonEditProps {
  link: string;
}

const ButtonEdit: FC<ButtonEditProps> = ({ link }) => {
  return (
    <Link to={link} className="button_icon" title="Edit">
      <FontAwesomeIcon icon={faPen} size="3x"/>
    </Link>
  );
};

export default ButtonEdit;
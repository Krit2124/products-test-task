import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonGoBack = () => {
  return (
    <button
      onClick={() => window.history.back()}
      title="Go Back"
      className={`button_icon`}
    >
      <FontAwesomeIcon icon={faArrowLeft} size="3x" />
    </button>
  );
};

export default ButtonGoBack;

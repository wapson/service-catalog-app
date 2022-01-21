import PropTypes from "prop-types";
import * as S from "./FormButtons.style";

const FormButtons = ({
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
}) => {
  return (
    <S.FormButtons>
      <S.Button onClick={primaryButtonAction}>{primaryButtonText}</S.Button>
      <S.Button onClick={secondaryButtonAction}>{secondaryButtonText}</S.Button>
    </S.FormButtons>
  );
};

FormButtons.propTypes = {
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonAction: PropTypes.func,
  primaryButtonAction: PropTypes.func,
};

export default FormButtons;

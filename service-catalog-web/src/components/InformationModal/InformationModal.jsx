import PropTypes from "prop-types";

import { StyledHeader, StyledParagraph } from "../../Styles/common.style";
import Modal from "../Utils/Modal/Modal";
import FormButtons from "../SharedComponents/FormButtons/FormButtons";

const InformationModal = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  closeModal,
}) => {
  return (
    <Modal onRequestClose={closeModal}>
      <div>
        <StyledHeader>{title}</StyledHeader>
        <StyledParagraph>{description}</StyledParagraph>
        <FormButtons
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
          primaryButtonAction={primaryButtonAction}
          secondaryButtonAction={secondaryButtonAction}
        />
      </div>
    </Modal>
  );
};

InformationModal.propTypes = {
  closeModal: PropTypes.func,
  description: PropTypes.string,
  primaryButtonAction: PropTypes.func,
  primaryButtonText: PropTypes.string,
  secondaryButtonAction: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  title: PropTypes.string,
};

export default InformationModal;

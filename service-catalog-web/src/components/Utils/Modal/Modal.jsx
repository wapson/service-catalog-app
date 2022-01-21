import Modal from "react-modal";
import PropTypes from "prop-types";

const ModalComponent = ({ children, onRequestClose }) => (
  <Modal
    ariaHideApp={false}
    isOpen
    className="modal"
    overlayClassName="modal-overlay"
    contentLabel="Modal"
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick
  >
    {children}
  </Modal>
);

ModalComponent.propTypes = {
  children: PropTypes.node,
  onRequestClose: PropTypes.func,
};

export default ModalComponent;

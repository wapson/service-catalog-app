import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import Modal from "../Utils/Modal/Modal";
import Input from "../Utils/Input/Input";
import FormButtons from "../SharedComponents/FormButtons/FormButtons";
import {
  StyledHeader,
  Inputlabel,
  StyledParagraph,
} from "../../Styles/common.style";

import { addUser, loginUser } from "../../store/actions/actions";

const AuthenticationModal = ({ closeAddServiceModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = async (formData) => {
    await dispatch(
      loginUser({ username: formData.nick, password: formData.password })
    );
    closeAddServiceModal();
  };

  const handleSignUp = async (formData) => {
    await dispatch(
      addUser({
        username: formData.nick,
        password: formData.password,
        email: formData.email,
      })
    );
    closeAddServiceModal();
  };

  return (
    <Modal onRequestClose={closeAddServiceModal}>
      <div>
        <StyledHeader>Authentication</StyledHeader>
        <Inputlabel htmlFor="nick">Nick</Inputlabel>
        <Input {...register("nick", { required: true })} />
        {errors.nick && (
          <StyledParagraph color="red" textAlign="left">
            This field is required
          </StyledParagraph>
        )}
        {/* <Inputlabel htmlFor="e-mail">E-mail</Inputlabel>
        <Input {...register("e-mail")} /> */}
        <Inputlabel htmlFor="password">Password</Inputlabel>
        <Input {...register("password", { required: true })} type="password" />
        {errors.password && (
          <StyledParagraph color="red" textAlign="left">
            This field is required
          </StyledParagraph>
        )}
        <FormButtons
          primaryButtonText="Sign in"
          secondaryButtonText="Sign Up"
          primaryButtonAction={handleSubmit(handleSignIn)}
          secondaryButtonAction={handleSubmit(handleSignUp)}
        />
      </div>
    </Modal>
  );
};

AuthenticationModal.propTypes = {
  closeAddServiceModal: PropTypes.func,
};

export default AuthenticationModal;

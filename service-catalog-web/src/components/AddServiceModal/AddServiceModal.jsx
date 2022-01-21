import { useDispatch, useSelector } from "react-redux";
import Modal from "../Utils/Modal/Modal";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import FormButtons from "../SharedComponents/FormButtons/FormButtons";
import { addService, updateService } from "../../store/actions/actions";
import Input from "../Utils/Input/Input";
import TextArea from "../Utils/TextArea/TextArea";

import { authSelector } from "./../../store/selectors/auth";

import {
  StyledHeader,
  Inputlabel,
  StyledParagraph,
} from "../../Styles/common.style";
import * as S from "./AddServiceModal.style";

const AddServiceModal = ({
  closeAddServiceModal,
  dataToUpdate,
  setDataToUpdate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { id } = useSelector(authSelector);

  const onSubmit = async (formData) => {
    if (dataToUpdate) {
      const data = {
        id: dataToUpdate.id,
        name: formData.fullName,
        shortname: formData.shortName,
        Labels: formData.labels?.split(" ").filter(Boolean),
        RepositoryURL: formData.repositoryUrl,
        Codeowners: formData.codeOwners?.split(" ").filter(Boolean),
        ownerid: id,
        DocumentationURLs: formData.documentationUrls
          ?.split(" ")
          .filter(Boolean),
        description: formData.description,
      };

      await dispatch(updateService(data));
      setDataToUpdate(null);
    } else {
      const data = {
        name: formData.fullName,
        shortname: formData.shortName,
        Labels: formData.labels.split(" ").filter(Boolean),
        RepositoryURL: formData.repositoryUrl,
        Codeowners: formData.codeOwners.split(" ").filter(Boolean),
        DocumentationURLs: formData.documentationUrls
          .split(" ")
          .filter(Boolean),
        description: formData.description,
      };
      dispatch(addService(data));
    }
    handleCloseAddServiceModal();
  };

  const handleCloseAddServiceModal = () => {
    setDataToUpdate(null);
    closeAddServiceModal();
  };

  return (
    <Modal onRequestClose={handleCloseAddServiceModal}>
      <S.AddServiceModal>
        <StyledHeader>
          {dataToUpdate ? "Update Service" : "Add Service"}
        </StyledHeader>
        <S.AddServiceModalContent>
          <Inputlabel htmlFor="shortName">Short Name</Inputlabel>
          <Input
            defaultValue={dataToUpdate?.shortname}
            {...register("shortName", { required: true })}
          />
          {errors.shortName && (
            <StyledParagraph color="red" textAlign="left">
              This field is required
            </StyledParagraph>
          )}
          <Inputlabel htmlFor="fullName">Full Name</Inputlabel>
          <Input
            defaultValue={dataToUpdate?.name}
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <StyledParagraph color="red" textAlign="left">
              This field is required
            </StyledParagraph>
          )}
          <Inputlabel htmlFor="labels">Labels</Inputlabel>

          <Input
            {...register("labels")}
            defaultValue={dataToUpdate?.labels?.join(" ")}
          />
          <Inputlabel htmlFor="codeOwners">Code Owners</Inputlabel>

          <Input
            {...register("codeOwners")}
            defaultValue={dataToUpdate?.codeowners?.join(" ")}
          />
          <Inputlabel htmlFor="repositoryUrl">Repository Url</Inputlabel>
          <Input
            {...register("repositoryUrl")}
            defaultValue={dataToUpdate?.repositoryurl}
          />
          <Inputlabel htmlFor="documentationUrls">
            Documentation Urls
          </Inputlabel>
          <Input
            {...register("documentationUrls")}
            defaultValue={dataToUpdate?.documentationurls?.join(" ")}
          />
          <Inputlabel htmlFor="description">Description</Inputlabel>
          <TextArea
            {...register("description")}
            rows={5}
            defaultValue={dataToUpdate?.description}
          />
        </S.AddServiceModalContent>
        <FormButtons
          primaryButtonText="Close"
          secondaryButtonText={dataToUpdate ? "Update" : "Add"}
          primaryButtonAction={handleCloseAddServiceModal}
          secondaryButtonAction={handleSubmit(onSubmit)}
        />
      </S.AddServiceModal>
    </Modal>
  );
};

AddServiceModal.propTypes = {
  closeAddServiceModal: PropTypes.func,
  dataToUpdate: PropTypes.object,
  setDataToUpdate: PropTypes.func,
};

export default AddServiceModal;

import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalComponent from "../Utils/Modal/Modal";
import SingleService from "../SingleService/SingleService";
import * as S from "./SingleServiceBasic.style";
import { StyledHeader, Styledlabel } from "../../Styles/common.style";
import { getService } from "../../store/actions/actions";

import { authSelector } from "./../../store/selectors/auth";

const SingleServiceBasic = ({
  data,
  setDataToUpdate,
  setIsAddServiceModalOpen,
}) => {
  const [isSingleServiceOpen, setIsSingleServiceOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  const { id } = useSelector(authSelector);

  const isEditable = id === data.ownerid;

  const handleOpenServiceDetails = async () => {
    setDetails(await dispatch(getService(data.name)));
    setIsSingleServiceOpen(true);
  };

  const handleSetDataToUpdate = (data) => {
    setDataToUpdate(data);
    setIsSingleServiceOpen(false);
  };

  const handleSetIsAddServiceModalOpen = (isOpen) => {
    setIsAddServiceModalOpen(isOpen);
    setIsSingleServiceOpen(false);
  };

  return (
    <>
      <S.SingleServiceBasic onClick={handleOpenServiceDetails}>
        <div>
          <section>
            {isEditable && <i className="fas fa-user"></i>}
            <StyledHeader> {data.name}</StyledHeader>
          </section>

          <div>
            {data.labels?.map((label, index) => (
              <Styledlabel key={index}>{label}</Styledlabel>
            ))}
          </div>
        </div>
      </S.SingleServiceBasic>
      {isSingleServiceOpen && (
        <ModalComponent onRequestClose={() => setIsSingleServiceOpen(false)}>
          <SingleService
            isScrollable
            data={details}
            setDataToUpdate={handleSetDataToUpdate}
            setIsAddServiceModalOpen={handleSetIsAddServiceModalOpen}
            isToggleable={false}
            width="800px"
          />
        </ModalComponent>
      )}
    </>
  );
};

SingleServiceBasic.propTypes = {
  data: PropTypes.object,
  setDataToUpdate: PropTypes.func,
  setIsAddServiceModalOpen: PropTypes.func,
};

export default SingleServiceBasic;

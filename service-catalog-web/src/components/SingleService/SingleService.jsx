import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";

import { deleteService } from "../../store/actions/actions";
import * as S from "./SingleService.style";
import { Styledlabel } from "../../Styles/common.style";
import InformationModal from "./../InformationModal/InformationModal";
import getClickableLink from "../../helpers/getClickableLink";

import { authSelector } from "./../../store/selectors/auth";

const SingleService = ({
  data,
  setDataToUpdate,
  setIsAddServiceModalOpen,
  isToggleable = true,
  width,
  isScrollable = false,
}) => {
  const [isOpen, setIsOpen] = useState(!isToggleable ? true : false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { id } = useSelector(authSelector);

  const isEditable = id === data.ownerid;

  const handleShowMoreInfo = () => setIsOpen(true);

  const handleHideMoreInfo = () => setIsOpen(false);

  const handleDeleteService = () => {
    dispatch(deleteService({ id: data.id }));
    setIsConfirmModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsConfirmModalOpen(true);
  };

  const handleUpdateService = () => {
    setDataToUpdate(data);
    setIsAddServiceModalOpen(true);
  };

  return (
    <>
      <S.SingleService
        isOpen={isOpen}
        onClick={!isOpen ? handleShowMoreInfo : undefined}
        width={width}
        isScrollable={isScrollable}
      >
        <div className="container">
          <div className="first-row">
            <div className="left-column">
              <header className="header">
                {isEditable && <i className="fas fa-user"></i>}
                <h1>{data.shortname}</h1>
                <h1> {data.name}</h1>
              </header>
              <div className="labels">
                {data.labels?.map((label, index) => (
                  <Styledlabel key={index}>{label}</Styledlabel>
                ))}
              </div>
            </div>
            <div className="right-column">
              <p className="description"> {data.description}</p>
            </div>
          </div>
          <div className="second-row">
            <div className="second-row--info info">
              <div className="info--title">Code Owners</div>
              <div className="info--description labels">
                {data.codeowners
                  ? data.codeowners.map((codeOwner, index) => (
                      <p className="label" key={codeOwner + index}>
                        {codeOwner}
                      </p>
                    ))
                  : "-"}
              </div>
            </div>
            <div className="second-row--info info">
              <div className="info--title">Documentation Urls</div>
              <div className="info--description labels">
                {data.documentationurls
                  ? data.documentationurls.map((docUrl, index) => (
                      <a
                        target="_blank"
                        href={getClickableLink(docUrl)}
                        className="label label__link "
                        key={docUrl + index}
                        rel="noreferrer"
                      >
                        {docUrl}
                      </a>
                    ))
                  : "-"}
              </div>
            </div>
            <div className="second-row--info info">
              <div className="info--title">Repository Url</div>
              <a
                target="_blank"
                href={getClickableLink(data.repositoryurl)}
                className="info--description link"
                rel="noreferrer"
              >
                {data.repositoryurl ? data.repositoryurl : "-"}
              </a>
            </div>
            <div className="second-row--info info">
              <div className="info--title">Added date</div>
              <div className="info--description">
                {dayjs(data.timestampadded).format("MMM D, YYYY h:mm A")}
              </div>
            </div>
            <div className="second-row--info info">
              <div className="info--title">Modified date</div>
              <div className="info--description">
                {data.timestampchanged
                  ? dayjs(data.timestampchanged).format("MMM D, YYYY h:mm A")
                  : "-"}
              </div>
            </div>
          </div>
          {isEditable && (
            <div className="buttons">
              <button onClick={handleUpdateService}>Update</button>
              <button onClick={handleConfirmDelete}>Delete</button>
            </div>
          )}
          {isToggleable && (
            <div className="buttons">
              <button onClick={handleHideMoreInfo}>
                <i className="fas fa-arrow-circle-up"></i>
              </button>
            </div>
          )}
        </div>
      </S.SingleService>
      {isConfirmModalOpen && (
        <InformationModal
          title="Are you sure?"
          description={`Are you sure you want to delete ${data.shortname}?`}
          primaryButtonText="Yes"
          secondaryButtonText="No"
          primaryButtonAction={handleDeleteService}
          secondaryButtonAction={() => setIsConfirmModalOpen(false)}
          closeModal={() => setIsConfirmModalOpen(false)}
        />
      )}
    </>
  );
};

SingleService.propTypes = {
  data: PropTypes.object,
  isScrollable: PropTypes.bool,
  isToggleable: PropTypes.bool,
  setDataToUpdate: PropTypes.func,
  setIsAddServiceModalOpen: PropTypes.func,
  width: PropTypes.string,
};

export default SingleService;

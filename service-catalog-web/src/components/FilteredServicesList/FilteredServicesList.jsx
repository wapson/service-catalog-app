import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Utils/Modal/Modal";
import { useForm } from "react-hook-form";
import searchFilterItems from "../../Mocks/searchFilter";

import FormButtons from "../SharedComponents/FormButtons/FormButtons";
import { ServicesList } from "../ServicesList/ServicesList.style";
import Input from "../Utils/Input/Input";
import SingleService from "../SingleService/SingleService";
import { filteredServicesListSelector } from "../../store/selectors/filteredServicesList";
import {
  listFilteredServices,
  clearFilteredList,
} from "../../store/actions/actions";
import * as S from "./FilteredServicesList.style";

import {
  StyledHeader,
  Inputlabel,
  HorizontalLine,
} from "../../Styles/common.style";

const FilteredServicesList = ({
  setDataToUpdate,
  setIsAddServiceModalOpen,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const list = useSelector(filteredServicesListSelector);

  const initialPage = 2;
  const pageSize = 25;

  const { register, handleSubmit } = useForm();

  const [pageState, setPageState] = useState(initialPage);
  const [isFilterByName, setIsFilterByName] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const handleHasMoreAfterLoad = (response) => {
    const shouldLoadMore = response?.length === pageSize;
    setHasMore(shouldLoadMore);
  };

  const handleSearch = async (name, pageArg, isNextPage) => {
    const response = await dispatch(
      listFilteredServices({
        page: pageArg,
        name,
        isName: isFilterByName,
        isNextPage,
      })
    );
    handleHasMoreAfterLoad(response);
  };

  const handleOnChange = async (fullName) => {
    handleSearch(fullName, 1, false);
    setPageState(initialPage);
  };

  const handleCloseModal = () => {
    dispatch(clearFilteredList());
    closeModal();
  };

  const handleNext = async ({ fullName }) => {
    if (!!fullName.length && hasMore) {
      await setPageState((prevCount) => prevCount + 1);
      await handleSearch(fullName, pageState, true);
    }
  };

  const handleUpdateService = (data) => {
    setDataToUpdate(data);
    closeModal();
  };

  return (
    <Modal onRequestClose={handleCloseModal}>
      <S.FilteredServicesList>
        <StyledHeader>Service Search</StyledHeader>
        <Inputlabel htmlFor="fullName">Service full Name</Inputlabel>
        <div>
          <Input
            {...register("fullName", {
              onChange: (event) => handleOnChange(event.target.value),
            })}
          />
          <S.SearchSelect
            id="search-type"
            onChange={(event) => {
              if (event.target.value === "name") {
                setIsFilterByName(true);
              } else setIsFilterByName(false);
            }}
          >
            {searchFilterItems.map(({ value }) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </S.SearchSelect>
        </div>
        <FormButtons
          secondaryButtonText="Load More"
          secondaryButtonAction={handleSubmit(handleNext)}
        />
        <ServicesList>
          {list.map((service) => (
            <Fragment key={service.id + service.timestampadded}>
              <SingleService
                data={service}
                setDataToUpdate={handleUpdateService}
                setIsAddServiceModalOpen={setIsAddServiceModalOpen}
              />
              <HorizontalLine />
            </Fragment>
          ))}
        </ServicesList>
      </S.FilteredServicesList>
    </Modal>
  );
};

export default FilteredServicesList;

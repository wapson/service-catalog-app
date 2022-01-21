import { useState, Fragment, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import { listServices } from "../../store/actions/actions";
import SingleService from "../SingleService/SingleService";
import * as S from "./ServicesList.style";
import { filteredServicesListSelector } from "../../store/selectors/filteredServicesList";
import { servicesListSelector } from "../../store/selectors/servicesList";

const ServicesList = ({
  filter,
  filterType,
  setDataToUpdate,
  setIsAddServiceModalOpen,
}) => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const filteredServicesList = useSelector(filteredServicesListSelector);
  const servicesList = useSelector(servicesListSelector);
  const isfilterTypeLabel = filterType === "label";

  const initialPage = 2;
  const pageSize = 25;

  const isFiltering = !!filteredServicesList.length;
  const data = isFiltering ? filteredServicesList : servicesList;

  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(data.length === pageSize);

  const handleLoadData = async () => {
    if (isfilterTypeLabel) {
      const response = await dispatch(
        listServices({ page, label: filter, isNextFilteredPage: isFiltering })
      );
      if (response?.length < pageSize) setHasMore(false);
    } else {
      const response = await dispatch(
        listServices({ page, name: filter, isNextFilteredPage: isFiltering })
      );
      if (response?.length < pageSize) setHasMore(false);
    }
    setPage(page + 1);
  };

  const checkIfHasMoreFilteredData = useCallback(() => {
    if (!!filter.length && filteredServicesList.length === pageSize)
      setHasMore(true);
  }, [filter.length, filteredServicesList.length]);

  useEffect(() => {
    setHasMore(data.length >= pageSize);
  }, [data.length]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
    setPage(initialPage);
  }, [filter]);

  useEffect(() => {
    checkIfHasMoreFilteredData();
  }, [checkIfHasMoreFilteredData, filter]);

  return (
    <S.ServicesList id="scrollableDiv" ref={scrollRef}>
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={data.length}
        next={handleLoadData}
        hasMore={hasMore}
      >
        {data.map((service) => (
          <Fragment key={service.id + service.timestampadded}>
            <SingleService
              data={service}
              setDataToUpdate={setDataToUpdate}
              setIsAddServiceModalOpen={setIsAddServiceModalOpen}
            />
            <S.HorizontalLine />
          </Fragment>
        ))}
      </InfiniteScroll>
    </S.ServicesList>
  );
};

ServicesList.propTypes = {
  filterType: PropTypes.string,
  filter: PropTypes.string,
  setDataToUpdate: PropTypes.func,
  setIsAddServiceModalOpen: PropTypes.func,
};

export default ServicesList;

import { useState, Fragment, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import { listServices } from "../../store/actions/actions";
import SingleService from "../SingleService/SingleService";
import * as S from "./ServicesList.style";
import { servicesListSelector } from "../../store/selectors/servicesList";

import { HorizontalLine } from "../../Styles/common.style";

const ServicesList = ({ setDataToUpdate, setIsAddServiceModalOpen }) => {
  const dispatch = useDispatch();

  const servicesList = useSelector(servicesListSelector);

  const initialPage = 2;
  const pageSize = 25;

  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(false);

  const handleHasMoreAfterLoad = (response) => {
    const shouldLoadMore = response?.length === pageSize;
    setHasMore(shouldLoadMore);
  };

  const handleLoadData = async () => {
    const response = await dispatch(
      listServices({ page, isNextFilteredPage: true })
    );
    handleHasMoreAfterLoad(response);
    setPage(page + 1);
  };

  useEffect(() => {
    async function loadInitialList() {
      const res = await dispatch(listServices({ page: 1 }));
      handleHasMoreAfterLoad(res);
    }
    loadInitialList();
  }, [dispatch]);

  return (
    <S.ServicesList id="scrollableDiv">
      <InfiniteScroll
        dataLength={servicesList?.length}
        next={handleLoadData}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
      >
        {!servicesList.includes(null) &&
          servicesList?.map((service) => (
            <Fragment key={service?.id + service?.timestampadded}>
              <SingleService
                data={service}
                setDataToUpdate={setDataToUpdate}
                setIsAddServiceModalOpen={setIsAddServiceModalOpen}
              />
              <HorizontalLine />
            </Fragment>
          ))}
      </InfiniteScroll>
    </S.ServicesList>
  );
};

export default ServicesList;

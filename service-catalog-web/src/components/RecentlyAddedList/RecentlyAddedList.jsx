import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";

import SingleServiceBasic from "../SingleServiceBasic/SingleServiceBasic";
import * as S from "./RecentlyAddedList.style";
import { StyledHeader } from "../../Styles/common.style";

import { servicesListSelector } from "../../store/selectors/servicesList";

dayjs.extend(relativeTime);

const RecentlyAddedList = ({ setDataToUpdate, setIsAddServiceModalOpen }) => {
  const servicesList = useSelector(servicesListSelector);

  const filteredServices = servicesList.filter((service) => {
    if (!service) return;
    const now = dayjs();
    const timeStamp = dayjs(service.timestampadded);
    return now.diff(timeStamp, "h") <= 24;
  });

  return (
    <S.RecentlyAddedList>
      <StyledHeader>Recently Added</StyledHeader>
      {!!filteredServices.length &&
        filteredServices?.map((service) => (
          <SingleServiceBasic
            key={service?.timestampadded + service?.id}
            data={service}
            setDataToUpdate={setDataToUpdate}
            setIsAddServiceModalOpen={setIsAddServiceModalOpen}
          />
        ))}
    </S.RecentlyAddedList>
  );
};

RecentlyAddedList.propTypes = {
  setDataToUpdate: PropTypes.func,
  setIsAddServiceModalOpen: PropTypes.func,
};

export default RecentlyAddedList;

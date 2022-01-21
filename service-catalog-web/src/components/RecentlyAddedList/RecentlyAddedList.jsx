import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import SingleServiceBasic from "../SingleServiceBasic/SingleServiceBasic";
import * as S from "./RecentlyAddedList.style";
import { StyledHeader } from "../../Styles/common.style";

dayjs.extend(relativeTime);

const RecentlyAddedList = ({
  servicesList,
  setDataToUpdate,
  setIsAddServiceModalOpen,
}) => {
  const filteredServices = servicesList.filter(({ timestampadded }) => {
    const now = dayjs();
    const timeStamp = dayjs(timestampadded);
    return now.diff(timeStamp, "h") <= 24;
  });

  return (
    <S.RecentlyAddedList>
      <StyledHeader>Recently Added</StyledHeader>
      {filteredServices.map((service) => (
        <SingleServiceBasic
          key={service.timestampadded + service.id}
          data={service}
          setDataToUpdate={setDataToUpdate}
          setIsAddServiceModalOpen={setIsAddServiceModalOpen}
        />
      ))}
    </S.RecentlyAddedList>
  );
};

RecentlyAddedList.propTypes = {
  servicesList: PropTypes.array,
  setDataToUpdate: PropTypes.func,
  setIsAddServiceModalOpen: PropTypes.func,
};

export default RecentlyAddedList;

import PropTypes from "prop-types";

import * as S from "./SearchBar.style";
import searchFilterItems from "../../Mocks/searchFilter";

const SearchBar = ({ setFilter, filter, setFilterType }) => (
  <>
    <S.SearchSelect
      id="search-type"
      onChange={(event) => setFilterType(event.target.value)}
    >
      {searchFilterItems.map(({ value }) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </S.SearchSelect>
    <S.SearchBar
      placeholder="Service search"
      type="search"
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
  </>
);

SearchBar.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.string,
};

export default SearchBar;

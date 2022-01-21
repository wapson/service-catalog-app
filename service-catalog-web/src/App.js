import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import AddServiceModal from "./components/AddServiceModal/AddServiceModal";
import SideBar from "./components/SideBar/SideBar";
import RecentlyAddedList from "./components/RecentlyAddedList/RecentlyAddedList";
import ServicesList from "./components/ServicesList/ServicesList";
import AuthenticationModal from "./components/AuthenticationModal/AuthenticationModal";
import Loader from "./components/Loader/Loader";
import Snackbar from "./components/Utils/Snackbar/Snackbar";

import { isLoadingSelector } from "./store/selectors/loadingReducer";
import { servicesListSelector } from "./store/selectors/servicesList";
import { isSnackbarShownSelector } from "./store/selectors/isSnackbarShown";
import { filteredServicesListSelector } from "./store/selectors/filteredServicesList";

import {
  listServices,
  loadDataFromLocalStorage,
  clearFilteredList,
} from "./store/actions/actions";

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.lightDarkColor};
  height: 100vh;
  position: relative;
  button,
  a {
    outline: none;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style-type: none;
  }
  button {
    background-color: transparent;
  }

  *[data-tooltip] {
    position: relative;
  }

  *[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    pointer-events: none;
    opacity: 0;
    -webkit-transition: opacity 0.15s ease-in-out;
    -moz-transition: opacity 0.15s ease-in-out;
    -ms-transition: opacity 0.15s ease-in-out;
    -o-transition: opacity 0.15s ease-in-out;
    transition: opacity 0.15s ease-in-out;

    color: ${(props) => props.theme.whiteColor};
    display: block;
    font-size: 12px;
    line-height: 16px;
    background: ${(props) => props.theme.lightDarkColor};
    padding: 0.5rem;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.4);
    width: max-content;
  }

  *[data-tooltip]:hover::after {
    opacity: 1;
  }
`;

const StyledAppContent = styled.div`
  display: flex;
  height: calc(100% - 50px);
`;

const App = () => {
  const isLoading = useSelector(isLoadingSelector);
  const servicesList = useSelector(servicesListSelector);
  const isSnackbarShown = useSelector(isSnackbarShownSelector);
  const filteredServicesList = useSelector(filteredServicesListSelector);

  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isAuthenticateModalOpen, setIsAuthenticateModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("name");

  const wasFilterCleared = !!filteredServicesList.length && !filter.length;

  const [dataToUpdate, setDataToUpdate] = useState(null);

  const dispatch = useDispatch();

  const toogleSideBarHandler = () =>
    setIsSideBarOpen((prevState) => !prevState);

  const getServices = useCallback(
    async (name, filterType = null) => {
      if (filterType === "label") {
        await dispatch(listServices({ label: name }));
      } else await dispatch(listServices({ name }));
    },
    [dispatch]
  );

  const debounceFn = useCallback(debounce(getServices, 800), []);

  useEffect(() => {
    dispatch(loadDataFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    filter && debounceFn(filter, filterType);
    wasFilterCleared && dispatch(clearFilteredList());
  }, [debounceFn, dispatch, filter, filterType, wasFilterCleared]);

  return (
    <StyledApp>
      <NavBar
        openAddServiceModal={() => setIsAddServiceModalOpen(true)}
        openAuthenticateModal={() => setIsAuthenticateModalOpen(true)}
        toogleSideBar={toogleSideBarHandler}
        setFilter={setFilter}
        filter={filter}
        setFilterType={setFilterType}
      />
      {isAddServiceModalOpen && (
        <AddServiceModal
          dataToUpdate={dataToUpdate}
          setDataToUpdate={setDataToUpdate}
          closeAddServiceModal={() => setIsAddServiceModalOpen(false)}
        />
      )}
      {isAuthenticateModalOpen && (
        <AuthenticationModal
          closeAddServiceModal={() => setIsAuthenticateModalOpen(false)}
        />
      )}
      {isSideBarOpen && <SideBar toogleSideBar={toogleSideBarHandler} />}
      {isLoading && <Loader />}
      {isSnackbarShown && <Snackbar />}
      <StyledAppContent>
        <RecentlyAddedList
          servicesList={servicesList}
          setDataToUpdate={setDataToUpdate}
          setIsAddServiceModalOpen={setIsAddServiceModalOpen}
        />
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"}>
            <ServicesList
              setIsAddServiceModalOpen={setIsAddServiceModalOpen}
              setDataToUpdate={setDataToUpdate}
              filter={filter}
              filterType={filterType}
              listLength={servicesList.length}
            />
          </Route>
        </Switch>
      </StyledAppContent>
    </StyledApp>
  );
};

export default App;

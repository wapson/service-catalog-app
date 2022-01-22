import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import NavBar from "./components/NavBar/NavBar";
import FilteredServicesList from "./components/FilteredServicesList/FilteredServicesList";
import AddServiceModal from "./components/AddServiceModal/AddServiceModal";
import SideBar from "./components/SideBar/SideBar";
import RecentlyAddedList from "./components/RecentlyAddedList/RecentlyAddedList";
import ServicesList from "./components/ServicesList/ServicesList";
import AuthenticationModal from "./components/AuthenticationModal/AuthenticationModal";
import Loader from "./components/Loader/Loader";
import Snackbar from "./components/Utils/Snackbar/Snackbar";

import { isLoadingSelector } from "./store/selectors/loadingReducer";
import { isSnackbarShownSelector } from "./store/selectors/isSnackbarShown";

import { loadDataFromLocalStorage } from "./store/actions/actions";

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
  const isSnackbarShown = useSelector(isSnackbarShownSelector);

  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isAuthenticateModalOpen, setIsAuthenticateModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFilteredServicesListModalOpen, setIsFilteredServicesListModalOpen] =
    useState(false);

  const [dataToUpdate, setDataToUpdate] = useState(null);

  const dispatch = useDispatch();

  const toogleSideBarHandler = () =>
    setIsSideBarOpen((prevState) => !prevState);

  useEffect(() => {
    dispatch(loadDataFromLocalStorage());
  }, [dispatch]);

  return (
    <StyledApp>
      <NavBar
        openAddServiceModal={() => setIsAddServiceModalOpen(true)}
        openAuthenticateModal={() => setIsAuthenticateModalOpen(true)}
        toogleSideBar={toogleSideBarHandler}
        openServicesFilteredListModal={() =>
          setIsFilteredServicesListModalOpen(true)
        }
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
      {isFilteredServicesListModalOpen && (
        <FilteredServicesList
          closeModal={() => setIsFilteredServicesListModalOpen(false)}
          setDataToUpdate={setDataToUpdate}
          setIsAddServiceModalOpen={setIsAddServiceModalOpen}
        />
      )}
      <StyledAppContent>
        <RecentlyAddedList
          setDataToUpdate={setDataToUpdate}
          setIsAddServiceModalOpen={setIsAddServiceModalOpen}
        />

        <ServicesList
          setIsAddServiceModalOpen={setIsAddServiceModalOpen}
          setDataToUpdate={setDataToUpdate}
        />
      </StyledAppContent>
    </StyledApp>
  );
};

export default App;

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import * as S from "./NavBar.style";
import { logoutUser } from "../../store/actions/actions";
import { isAuthenticatedSelector } from "./../../store/selectors/auth";

const NavBar = ({
  openAddServiceModal,
  openAuthenticateModal,
  toogleSideBar,
  openServicesFilteredListModal,
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutUser());

  return (
    <S.Navbar>
      <S.List>
        <S.NavSide>
          <NavLink to={process.env.PUBLIC_URL + "/"}>
            <S.Icon className="fas fa-book-open"></S.Icon>
          </NavLink>
          <S.ListItem>
            <S.Button
              onClick={openServicesFilteredListModal}
              data-tooltip="Search for service"
            >
              <S.Icon className="fas fa-search"></S.Icon>{" "}
            </S.Button>
          </S.ListItem>
        </S.NavSide>
        <S.NavSide>
          {isAuthenticated && (
            <S.ListItem>
              <S.Button
                onClick={openAddServiceModal}
                data-tooltip="Add service"
              >
                <S.Icon className="fas fa-plus"></S.Icon>
              </S.Button>
            </S.ListItem>
          )}
          {!isAuthenticated && (
            <S.ListItem>
              <S.Button
                onClick={openAuthenticateModal}
                data-tooltip="Authenticate"
              >
                <S.Icon className="fas fa-user"></S.Icon>
              </S.Button>
            </S.ListItem>
          )}
          {isAuthenticated && (
            <S.ListItem>
              <S.Button onClick={handleLogout} data-tooltip="Logout">
                <S.Icon className="fas fa-sign-out-alt"></S.Icon>
              </S.Button>
            </S.ListItem>
          )}
          <S.ListItem>
            <S.Button onClick={toogleSideBar}>
              <S.Icon className="fas fa-bars"></S.Icon>
            </S.Button>
          </S.ListItem>
        </S.NavSide>
      </S.List>
    </S.Navbar>
  );
};

NavBar.propTypes = {
  openAddServicemodal: PropTypes.func,
  toogleSideBar: PropTypes.func,
};

export default NavBar;

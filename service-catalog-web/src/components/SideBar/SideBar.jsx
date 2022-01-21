import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import * as S from "./SideBar.style";

const SideBar = ({ toogleSideBar }) => {
  return (
    <S.SideBar>
      <div>
        <button onClick={toogleSideBar}>
          <i className="fas fa-times"></i>
        </button>
        <ul>
          <li>
            <NavLink to={process.env.PUBLIC_URL + "/"}>
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + "/"}>
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + "/"}>
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + "/"}>
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + "/"}>
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + "/"}>
              <button>Home</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </S.SideBar>
  );
};

SideBar.propTypes = {
  toogleSideBar: PropTypes.func,
};

export default SideBar;

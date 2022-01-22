import { useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialSnackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useDispatch } from "react-redux";

import { snackbarSelector } from "../../../store/selectors/snackbar";
import { hideSnackbar } from "../../../store/actions/actions";

const Snackbar = () => {
  const { message, isError } = useSelector(snackbarSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 2000);
  });

  return (
    <MaterialSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={true}
      key={message}
    >
      <SnackbarContent
        style={{
          fontSize: "15px",
          backgroundColor: isError ? "red" : "#5E503F",
        }}
        message={message}
      />
    </MaterialSnackbar>
  );
};

export default Snackbar;

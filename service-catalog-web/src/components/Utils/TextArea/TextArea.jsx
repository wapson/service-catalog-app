import * as S from "./TextArea.style";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const TextArea = ({ ...rest }, ref) => <S.TextArea {...rest} ref={ref} />;

TextArea.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
};

export default forwardRef(TextArea);

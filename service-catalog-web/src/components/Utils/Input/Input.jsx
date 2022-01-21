import * as S from "./Input.style";
import { forwardRef, useState } from "react";

const Input = ({ type = "text", ...rest }, ref) => {
  const [inputType, setInputType] = useState(type);
  const isPassword = type === "password";
  const handleToggleVisibility = () =>
    setInputType(inputType === "text" ? "password" : "text");

  return (
    <>
      <S.Input {...rest} ref={ref} isPassword type={inputType} />
      {isPassword && (
        <S.InputVisibility onClick={handleToggleVisibility}>
          {inputType === "password" ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </S.InputVisibility>
      )}
    </>
  );
};

export default forwardRef(Input);

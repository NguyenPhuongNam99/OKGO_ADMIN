import React from "react";
import { BsPlusLg } from "react-icons/bs";

interface TypeHeaderForm {
  onclick?: any
}

const HeaderForm:React.FC<TypeHeaderForm> = ({onclick}) => {
  return (
    <div className="headerForm" onClick={onclick}>
      <div />
      <div className="buttonCreate">
        <BsPlusLg color="white" />
        Thêm mới
      </div>
    </div>
  );
};

export default HeaderForm;
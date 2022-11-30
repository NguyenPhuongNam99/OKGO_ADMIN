import React from "react";

const InputContent = ({title}: any) => {
  return (
    <div className="itemContent">
      <div className="itemLeft">
        <p>{title} </p>
      </div>
      <div className="itemRight">
        <input className="inputUpdtae" />
      </div>
    </div>
  );
};

export default InputContent;

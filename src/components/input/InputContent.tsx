import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface TypeInputContent {
  title?: string;
  option?: boolean;
  type?: string;
  name?: string;
  value?: string;
  errors?: string | undefined;
  touched?: boolean | undefined;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

const InputContent = ({
  title,
  option,
  type,
  name,
  onChange,
  onBlur,
  value,
  errors,
  touched,
}: TypeInputContent) => {
  const [valueDate, onChangeDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="itemContent">
      <div className="itemLeft">
        <p>{title} </p>
      </div>
      <div className="itemRight" onClick={() => setOpen(!open)}>
        <input
          className="inputUpdtae"
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
       
        {option && open && (
          <div>
            <Calendar onChange={onChangeDate} value={valueDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputContent;

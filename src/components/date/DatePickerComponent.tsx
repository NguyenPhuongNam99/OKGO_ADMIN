import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import moment from "moment";

interface TypeDatePickerComponent {
    handleDatePickerChange: (date: any, dateString: any, id: any) => void;
}
  dayjs.extend(customParseFormat);

const DatePickerComponent: React.FC<TypeDatePickerComponent> = ({handleDatePickerChange}) => {
  const dateFormat = "DD/MM/YYYY";  
  return (
    <DatePicker
      format={dateFormat}
      onChange={(date, dateString) =>
        handleDatePickerChange(date, dateString, 1)
      }
    />
  );
};

export default DatePickerComponent;

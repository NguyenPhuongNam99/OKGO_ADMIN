import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import moment from "moment";

interface TypeDatePickerComponent {
  handleDatePickerChange: (date: any, dateString: any, id: any) => void;
  onlyTimeNow?: any;
  timeValue?: string;
}
dayjs.extend(customParseFormat);

const DatePickerComponent: React.FC<TypeDatePickerComponent> = ({
  handleDatePickerChange,
  onlyTimeNow,
  timeValue
}) => {
  const dateFormat = "DD/MM/YYYY HH:mm";
  const dateTimeNow = "HH:mm";
  const initialState = {
    data1: "form field",
    data2: "form field 2",
    "Campaign-date": timeValue,
  };
  const [formData, setFormData] = React.useState(initialState);

  return (
    <DatePicker
      format={!onlyTimeNow ? dateFormat : dateTimeNow}
      showTime={true}
      defaultValue={
        timeValue && moment(formData["Campaign-date"], "YYYY/MM/DD HH:mm") as any
      }
      onChange={(date, dateString) =>
        handleDatePickerChange(date, dateString, 1)
      }
    />
  );
};

export default DatePickerComponent;

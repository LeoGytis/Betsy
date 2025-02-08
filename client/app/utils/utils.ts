import moment from "moment";

export const formatDateToTime = (date: string | Date) => {
  return moment(date).format("HH:mm:ss");
};

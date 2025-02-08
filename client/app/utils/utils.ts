import moment from "moment";

export const formatDateToTime = (date: string | Date) => {
  return moment(date).format("HH:mm:ss");
};

export const getAuthenticatedUser = (): string | null => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  return token && userName ? userName : null;
};

import moment from "moment";

export const formatDate = (date: string | Date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const getAuthenticatedUser = (): string | null => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  return token && userName ? userName : null;
};

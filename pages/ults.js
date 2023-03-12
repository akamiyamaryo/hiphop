export const formatDateStr = (unixTimeSeconds) => {
  const date = new Date(unixTimeSeconds * 1000);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${hour}:${minute}`;
};

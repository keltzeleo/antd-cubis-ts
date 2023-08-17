export const generateUniqueID = () => {
  const timestamp = new Date().getTime().toString(16);
  const randomNum = Math.random().toString(16).substr(2);
  return timestamp + randomNum;
};

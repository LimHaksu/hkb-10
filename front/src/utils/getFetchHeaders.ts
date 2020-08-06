export default () => {
  const token = sessionStorage.getItem("token") || "";
  return {
    Authorization: token,
  };
};

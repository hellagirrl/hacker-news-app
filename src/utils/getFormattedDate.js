export const getFormattedDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

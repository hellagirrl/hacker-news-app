const getFormattedDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

const getHostName = (itemURL) => {
  if (!itemURL) {
    return null;
  }
  const url = new URL(itemURL);
  return url.hostname;
};

export { getFormattedDate, getHostName };

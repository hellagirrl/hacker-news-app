export const getHostName = (itemURL) => {
  if (!itemURL) {
    return null;
  }
  const url = new URL(itemURL);
  return url.hostname;
};

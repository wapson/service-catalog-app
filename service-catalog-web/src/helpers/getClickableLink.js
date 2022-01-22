const getClickableLink = (link) => {
  return link?.startsWith("http://") || link?.startsWith("https://")
    ? link
    : `http://${link}`;
};

export default getClickableLink;

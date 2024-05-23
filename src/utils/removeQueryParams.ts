function removeQueryParams(url: string) {
  try {
    const urlObj = new URL(url);
    urlObj.search = "";
    const cleanUrl = urlObj.toString();
    return cleanUrl;
  } catch (error) {
    console.error(error);
    return url;
  }
}

export default removeQueryParams;

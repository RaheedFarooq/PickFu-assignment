const self = module.exports;

/**
 * Format a URL String - check if it contains http(s) and remove (www.)
 * @param {string} url
 * @returns {string} a formatted url string
 */
self.reformatURL = (url) => {
  if (!url.includes("http://") && !url.includes("https://"))
    url = "https://" + url;
  return url.split("www.").join("");
};

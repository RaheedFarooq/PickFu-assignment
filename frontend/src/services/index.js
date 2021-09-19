import { BASE_PATH } from "./constants";

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    throw new Error(text);
  });
}

/**
 * API Service to create a Tiny URL
 * @param {string} url
 * @returns {Promise} A Promise response of the Api that would contain the minified key for the URL
 */
export const minifyURLService = (url) => {
  const api_options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  };
  return fetch(BASE_PATH, api_options).then(handleResponse);
};

/**
 * API Service that get the list of Top most visited Sites
 * @returns {Promise} A Promise response of the Api that would contain array of the popular url's object
 */
export const getPopularLinks = () => {
  const api_options = {
    method: "GET",
  };
  return fetch(BASE_PATH, api_options).then(handleResponse);
};

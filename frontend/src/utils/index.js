import { BASE_PATH } from "../services/constants";

const urlRegex =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const validUrl = (string) => urlRegex.test(string);

/**
 * Parse Data - for display in Table
 * @param {Array} data
 * @returns {Array} list of parsed data
 */
export const tableDataParser = (data) => {
  return data.map(({ _id, url, hit_rate }) => {
    return {
      tiny: `${BASE_PATH}/${_id}`,
      url,
      hit_rate,
    };
  });
};

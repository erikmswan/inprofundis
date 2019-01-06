/**
 * Looks where the user's scroll position is
 * and comes up with a factor between 0 and 1.
 */
export const getScrollFactor = () => {
  if (!document) return 0;
  const scrollHeight = document.body.scrollHeight;
  const scrollOffset = document.body.getBoundingClientRect().top;
  if (scrollOffset === 0) return 0;
  const percentage = (scrollOffset * -1) / scrollHeight;
  return Math.round(percentage * 100) / 100;
};

/**
 * Returns a single rgb color interpolation between given rgb colors
 * @param {String} color1 an array of 3 rgb colors like [0, 0, 0]
 * @param {*} color2 an array of 3 rgb colors like [255, 255, 255]
 * @param {*} factor a number between 0 and 1
 * @return {String} an rgb string number
 */
export const interpolateColor = (color1, color2, factor = 0.5) => {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return prepareRgbString(result);
};

/**
 * Converts array of numbers to rgb string
 * @param {Array} rgbArray an array of 3 numbers between 0 and 255
 */
export const prepareRgbString = rgbArray => {
  const commas = rgbArray.join(",");
  return `rgb(${commas})`;
};

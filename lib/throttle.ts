/**
 * @description Delay frequency of a callback function by specified time.
 *
 * @param {number} delay - time in milliseconds to delay callback
 * @param {Function} callback - event's callback function
 * @return (Function)
 *
 */

export const throttle = (callback: Function, delay: number) => {
  let previousTime = 0;

  return (...args: any) => {
    const currentTime = new Date().getTime();

    if (currentTime - previousTime > delay) {
      previousTime = currentTime;
      return callback(...args);
    }
  };
};

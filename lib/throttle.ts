/**
 * @description Delay frequency of a callback function by specified time.
 *
 * @param {number} delay - time in milliseconds to delay callback
 * @param {Function} callback - event's callback function
 * @return (Function)
 *
 */
export const throttle = (callback: Function, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: unknown[]) => {
    if (timer) {
      console.log("clearTimeout(timer)");
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
      console.log("callback() -- setTimeout");
      timer = null;
    }, delay);
  };
};

// Throttle: Limits the rate at which a function can be called.
// Ensures that the function is not called more often than the specified limit.
// Useful for optimizing performance by reducing the frequency of function calls.

export function throttle(func: Function, limit: number) {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return function (...args: any[]) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export const wrap = (fn, ...preArgs) => (...args) => fn(...preArgs, ...args);

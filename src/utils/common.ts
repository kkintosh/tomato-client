/* eslint-disable @typescript-eslint/no-explicit-any */

export function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
}

export function isDate(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}

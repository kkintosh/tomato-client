/* eslint-disable @typescript-eslint/no-explicit-any */

export function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
}

export function isDate(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}

export function shortenDateTime(timestamp: Date) {
  return timestamp.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

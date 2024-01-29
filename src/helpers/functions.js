/**
 * Check the value is empty or not.
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
export function isEmpty(value) {
  if (typeof value === undefined || value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value) && value.length <= 0) {
    return true;
  }
  if (typeof value === "object") {
    return Object.values(value).filter((item) => item).length <= 0;
  }
  if (typeof value === "string") {
    return value.length <= 0;
  }
  if (typeof value === "number") {
    return value <= 0;
  }
  return !value;
}

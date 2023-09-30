import equal from "fast-deep-equal";

type Value = null | number | string | boolean | object | Value[];

export function keepUnchangedValues(left: Value, right: Value): Value {
  if (equal(left, right)) return left;
  if (!left || typeof left !== typeof right || (typeof left !== 'object' && typeof right !== 'object')) return right;
  if (Array.isArray(left) && Array.isArray(right)) {
    const result: Value[] = [];
    for (const item of right) {
      const foundItem = left.find(lItem => equal(lItem, item));
      result.push(foundItem !== undefined ? foundItem : item);
    }
    return result;
  }

  const result: Value = {...(right as object)};
  let allEqual = true;

  for (const key of Object.keys(left)) {
    if (!right.hasOwnProperty(key)) {
      allEqual = false;
      continue;
    }
    const res = keepUnchangedValues(left[key], right[key]);
    if (!equal(res, left[key])) allEqual = false;
    result[key] = res;
  }

  return allEqual ? (left as object) : result;
}

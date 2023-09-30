import equal from "fast-deep-equal";

export function mergePreferLeft(left, right) {
  if (equal(left, right)) return left;
  if (!left) return right;
  if (Array.isArray(left) && Array.isArray(right)) {
    const result = [];

    for (const item of right) {
      const foundItem = left.find(lItem => equal(lItem, item));
      result.push(foundItem !== undefined ? foundItem : item);
    }

    return result;
  }

  if ((typeof left !== 'object' && typeof right !== 'object') || left === null || right === null) {
    return right;
  }

  const result = { ...right };
  let allEqual = true;

  for (const key of Object.keys(left)) {
    if (!right.hasOwnProperty(key)) {
      allEqual = false;
      continue;
    }
    const res = mergePreferLeft(left[key], right[key]);
    if (!equal(res, left[key])) allEqual = false;
    result[key] = res;
  }

  return allEqual ? left : result;
}

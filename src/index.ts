export function keepUnchangedValues(left: any, right: any): any {
  if (equal(left, right)) return left;
  if (
    !left ||
    !right ||
    typeof left !== typeof right ||
    typeof left !== "object" ||
    typeof right !== "object"
  )
    return right;
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return right;
    const result = [];
    for (const item of right) {
      //todo: optimize this
      const foundItem = left.find((lItem) => equal(lItem, item));
      result.push(foundItem !== undefined ? foundItem : item);
    }
    return result;
  }

  const result = { ...(right as Record<string, any>) };
  let allEqual = true;

  for (const key of Object.keys(right)) {
    if (!right.hasOwnProperty(key)) {
      allEqual = false;
      continue;
    }
    const res = keepUnchangedValues(left[key], right[key]);
    if (res !== left[key]) allEqual = false;
    result[key] = res;
  }

  return allEqual ? (left as object) : result;
}

function equal(left: any, right: any): boolean {
  if (left === right) return true;
  if (Array.isArray(left) || Array.isArray(right)) {
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i++) {
      if (!equal(left[i], right[i])) return false;
    }
    return true;
  }
  if (typeof left === "object" && typeof right === "object") {
    if (left === null || right === null) return false;
    const keysLeft = Object.keys(left);
    const keysRight = Object.keys(right);
    if (keysLeft.length !== keysRight.length) return false;
    for (const key of keysLeft) {
      if (!keysRight.includes(key) || !equal(left[key], right[key]))
        return false;
    }
    return true;
  }
  return false;
}

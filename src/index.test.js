import { expect, it, describe } from "vitest";
import { keepUnchangedValues } from "./index";

describe("mergePreferLeft arrays", () => {
  it("should handle arrays with primitives. If left and right values are arrays, it should apply right", () => {
    const left = [1, 2, 3];
    const right = [2, 3, 4];
    const expected = [2, 3, 4];
    expect(keepUnchangedValues(left, right)).toEqual(expected);
  });

  it("should handle arrays with objects. applies right array, but keeps left array objects", () => {
    const left = [{ a: 1 }, { b: 2 }, { c: 3 }, 5];
    const right = [{ b: 2 }, "jjj", { c: 3 }, { d: 4 }];

    const result = keepUnchangedValues(left, right);
    const expected = [{ b: 2 }, "jjj", { c: 3 }, { d: 4 }];

    expect(result).toEqual(expected);
    expect(result[0] === left[1] && result[2] === left[2]).toBe(true);
  });
});

describe("mergePreferLeft objects", () => {
  it("should handle objects with primitives. If left and right values are objects, it should apply right", () => {
    const left = { a: 1, b: 2, c: 3 };
    const right = { b: 2, c: 3, d: 4 };
    const result = keepUnchangedValues(left, right);
    const expected = { b: 2, c: 3, d: 4 };
    expect(result).toEqual(expected);
    expect(result.b === left.b && result.c === left.c).toBe(true);
  });

  it("should handle objects with objects. applies right object, but keeps left object properties", () => {
    const left = { a: { a: 1 }, b: { b: 2 }, c: { c: 3 }, d: 5 };
    const right = { b: { b: 2 }, jjj: "jjj", c: { c: 3 }, d: { d: 4 } };

    const result = keepUnchangedValues(left, right);
    const expected = { b: { b: 2 }, jjj: "jjj", c: { c: 3 }, d: { d: 4 } };

    expect(result).toEqual(expected);
    expect(result.b === left.b && result.c === left.c).toBe(true);
  });

  it("should handle objects with arrays. applies right object, but keeps left object properties", () => {
    const left = { a: { a: 1 }, b: { b: 2 }, c: { c: 3 } };
    const right = { b: { b: 2 }, jjj: "jj", c: { c: 3 }, d: { d: 4 } };

    const result = keepUnchangedValues(left, right);
    const expected = { b: { b: 2 }, jjj: "jj", c: { c: 3 }, d: { d: 4 } };
    expect(result).toEqual(expected);
    expect(result.b === left.b && result.c === left.c).toBe(true);
  });
});

describe("mergePreferLeft primitives", () => {
  it("should handle primitives. If left and right values are primitives, it should apply right", () => {
    const left = 1;
    const right = 2;
    const result = keepUnchangedValues(left, right);
    const expected = 2;
    expect(result).toEqual(expected);
  });

  it("should handle primitives. If left is null, it should apply right", () => {
    const left = null;
    const right = 2;
    const result = keepUnchangedValues(left, right);
    const expected = 2;
    expect(result).toEqual(expected);
  });

  it("should handle primitives. If right is null, it should apply right", () => {
    const left = 1;
    const right = null;
    const result = keepUnchangedValues(left, right);
    const expected = null;
    expect(result).toEqual(expected);
  });
});

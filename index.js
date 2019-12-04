const { expect } = require("chai");
const supertest = require("supertest");

function sort(list) {
  for (let i = 2; i < list.length; i++) {
    if (typeof list[i] != "number") throw new TypeError("invalid array index");
    let j = i;
    while (j > 0 && list[j - 1] > list[j]) {
      let temp = list[j];
      list[j] = list[j - 1];
      list[j - 1] = temp;
      j--;
    }
  }
  return list;
}

const arr = [1, 3, 4, 5, 77, 2, 32];

describe("sorting tests", function() {
  it("should sort a numerical array in ascending order", () => {
    expect(sort(arr)).to.deep.equal(arr.sort((a, b) => a - b));
  });

  it("only accept numerical arrays", () => {
    const fn = () => sort(["a", "b", "c"]);
    expect(fn).to.throw();
  });

  it("return an array", () => {
    expect(Array.isArray(sort(arr))).to.be.true;
  });
});

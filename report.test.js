const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages ", () => {
  const input = {
    "https://boot.dev": 3,
    "https://boot.dev/path/": 2,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://boot.dev", 3],
    ["https://boot.dev/path/", 2],
  ];
  expect(actual).toEqual(expected);
});

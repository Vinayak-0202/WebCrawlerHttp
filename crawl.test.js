const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip url", () => {
  const input = "https://boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

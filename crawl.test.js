const { normalizeURL, getURLFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip url", () => {
  const input = "https://boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLFromHTML absolute", () => {
  const inputHtmlBody = `<html>
   <body> 
      <a href='https://boot.dev/path/'>Boot.dev</a>
   </body>
  </html>`;
  const inputBaseURL = "https://boot.dev/path/";
  const actual = getURLFromHTML(inputHtmlBody, inputBaseURL);
  const expected = ["https://boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLFromHTML relative", () => {
  const inputHtmlBody = `<html>
   <body>
      <a href='/path'>Boot.dev</a>
   </body>
  </html>`;
  const inputBaseURL = "https://boot.dev";
  const actual = getURLFromHTML(inputHtmlBody, inputBaseURL);
  const expected = ["https://boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getURLFromHTML Invalid", () => {
  const inputHtmlBody = `<html>
   <body>
      <a href='Invalid'>Boot.dev</a>
   </body>
  </html>`;
  const inputBaseURL = "https://boot.dev";
  const actual = getURLFromHTML(inputHtmlBody, inputBaseURL);
  const expected = ["https://boot.dev/path"];
  expect(actual).toEqual(expected);
});

const { JSDOM } = require("jsdom");
let count = 0;
async function crawlPage(baseURL, currentURL, pages) {
  count++;
  if (count > 1000) {
    return pages;
  }
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;
  console.log(`actively crawling URL ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code ${resp.status} on page: ${currentURL}`
      );
      return pages;
    }
    const htmlBody = await resp.text();

    const nextURLs = getURLFromHTML(htmlBody);

    for (nextURL of nextURLs) {
      pages = crawlPage(baseURL, nextURL, pages);
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `no html response, content Type: ${contentType} on page: ${currentURL}`
      );
      return pages;
    }
  } catch (err) {
    console.log(`Error in fetch : ${err.message} on page: ${currentURL}`);
  }

  return pages;
}
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getURLFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error with url");
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("error with url");
      }
    }
  }
  return urls;
}
module.exports = {
  normalizeURL,
  getURLFromHTML,
  crawlPage,
};

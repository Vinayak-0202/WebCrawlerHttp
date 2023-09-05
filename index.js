const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  if (process.argv < 3) {
    console.log("no website is provided");
    process.exit(1);
  }

  if (process.argv > 3) {
    console.log("to many commandline args");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`starting crawling website ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();

const axios = require("axios");
const cheerio = require("cheerio");
const Tool = require("./Tool");

class LinkExplorerTool extends Tool {
  constructor(maxTokenLimit) {
    super(
      "LinkExplorer",
      "This tool can extract the content and links of a webpage when provided a URL. It returns the summarized content and links of the webpage."
    );
    this.maxTokenLimit = maxTokenLimit;
  }

  get maxTokenLimit() {
    return this._maxTokenLimit;
  }

  set maxTokenLimit(value) {
    this._maxTokenLimit = value;
  }

  async use(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Extract the page's <body> text
      let bodyText = $("body").text();

      // Extract all hyperlinks from the page
      let links = [];
      $("a").each((index, element) => {
        const link = $(element).attr("href");
        if (link) {
          links.push(link);
        }
      });

      return {
        role: "assistant",
        content:
          "Observation: The content is: " +
          bodyText +
          " and the links are: " +
          JSON.stringify(links),
      };
    } catch (error) {
      return {
        role: "assistant",
        content: "Observation: Error - " + error,
      };
    }
  }
}

module.exports = LinkExplorerTool;

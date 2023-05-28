const axios = require("axios");
const Tool = require("./Tool");

class SearchWebTool extends Tool {
  constructor(apiKey, cx) {
    super(
      "SearchWeb",
      "This tool can execute a web search when provided a query string. It returns the parsed results of the search."
    );
    this.apiKey = apiKey;
    this.cx = cx;
  }

  async use(query) {
    try {
      const response = await axios.get(
        `https://customsearch.googleapis.com/customsearch/v1`,
        {
          params: {
            q: query,
            key: this.apiKey,
            cx: this.cx,
          },
        }
      );

      // Extract items from response
      const items = response.data.items;

      // Map items to a simplified structure
      const results = items.map((item) => ({
        title: item.title,
        link: item.link,
        description: item.snippet,
      }));

      return {
        role: "assistant",
        content: "Observation: " + JSON.stringify(results),
      };
    } catch (error) {
      console.log(error);
      return {
        role: "assistant",
        content: "Observation: Error - " + error,
      };
    }
  }
}

module.exports = SearchWebTool;

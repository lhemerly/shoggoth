const axios = require("axios");
const Message = require("../Messages/Message");
const Tool = require("./Tool");

class SearchWebTool extends Tool {
  constructor(apiKey, cx) {
    super(
      "SearchWebTool",
      "This tool can execute a web search when provided a query string. It returns the parsed results of the search."
    );
    this.apiKey = apiKey;
    this.cx = cx;
  }

  async use(query) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
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

      return new Message(
        "Assistant",
        "Observation: Successfully executed the web search. The results are: " +
          JSON.stringify(results)
      );
    } catch (error) {
      return new Message("Assistant", "Observation: Error - " + error);
    }
  }
}

module.exports = SearchWebTool;

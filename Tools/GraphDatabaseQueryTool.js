const neo4j = require("neo4j-driver");
const Message = require("../Messages/Message");
const Tool = require("./Tool");

class GraphDatabaseQueryTool extends Tool {
  // Constructor
  constructor(uri, user, password) {
    super(
      "GraphDatabaseQueryTool",
      "This tool can execute a query on a graph database when provided a query string. It returns the results of the query."
    );
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  async use(query) {
    let session = this.driver.session();
    try {
      let result = await session.run(query);
      let records = result.records.map((record) => record.toObject());

      return new Message(
        "Assistant",
        "Observation: Successfully executed the query. The results are: " +
          JSON.stringify(records)
      );
    } catch (error) {
      return new Message("Assistant", "Observation: Error - " + error);
    } finally {
      await session.close();
    }
  }
}

module.exports = GraphDatabaseQueryTool;

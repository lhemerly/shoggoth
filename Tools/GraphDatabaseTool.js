const neo4j = require("neo4j-driver");
const Message = require("../Messages/Message");
const Tool = require("./Tool");

class GraphDatabaseTool extends Tool {
  // Constructor
  constructor(uri, user, password) {
    super(
      "GraphDatabase",
      "This tool can add nodes and connectors to a graph database when provided an input object with 'nodes' and 'connectors' arrays. 'nodes' is an array of node names and 'connectors' is an array of objects, each with a 'node1' and 'node2' that represents a connection between two nodes."
    );
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  async use(input) {
    let session = this.driver.session();
    try {
      // Assuming input is an object with `nodes` and `connectors` arrays
      for (let node of input.nodes) {
        let result = await session.run(
          "CREATE (a:Node {name: $name}) RETURN a",
          { name: node }
        );
        console.log(result);
      }

      for (let connector of input.connectors) {
        let result = await session.run(
          "MATCH (a:Node {name: $node1}), (b:Node {name: $node2}) CREATE (a)-[r:CONNECTS]->(b) RETURN r",
          { node1: connector.node1, node2: connector.node2 }
        );
        console.log(result);
      }

      return {
        role: "assistant",
        content:
          "Observation: Successfully added nodes and connectors to the graph database.",
      };
    } catch (error) {
      return {
        role: "assistant",
        content: "Observation: Error - " + error,
      };
    } finally {
      await session.close();
    }
  }
}

module.exports = GraphDatabaseTool;

const MongoClient = require("mongodb").MongoClient;
const Convo = require("./Convo");
const ObjectId = require("mongodb").ObjectId;
// eslint-disable-next-line no-unused-vars
const { encode, decode } = require("gpt-3-encoder");

class MongoDB {
  constructor(uri) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = null;
    this.collection = null;
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db("convoDB");
    this.collection = this.db.collection("convos");
  }

  async close() {
    await this.client.close();
  }

  async saveConvo(convo, user, title) {
    const data = {
      history: convo.history,
      user: user,
      title: title,
      date: new Date(),
    };

    const result = await this.collection.insertOne(data);
    return result.insertedId;
  }

  async loadConvo(id) {
    const data = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!data) {
      throw new Error("Convo not found");
    }

    const convo = new Convo(data.history);
    convo.adjustConvo(encode);

    return convo;
  }

  async getConvoIdsByUser(user) {
    const data = await this.collection
      .find({ user: user })
      .project({ _id: 1, title: 1 })
      .toArray();
    return data.map((convo) => ({
      id: convo._id.toString(),
      title: convo.title,
    }));
  }
}

module.exports = MongoDB;

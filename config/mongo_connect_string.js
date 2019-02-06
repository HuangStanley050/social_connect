const connect_string = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-cjli2.mongodb.net/social_connect?retryWrites=true`;
exports.connect_string = connect_string;

import mongoose from "mongoose";

const username = process.env.db_username || "test";
const password = process.env.db_pass || "test";
const dbname = process.env.db_name || "dyna-swap";

const uri = `mongodb+srv://${username}:${password}@cluster0.cnmbib5.mongodb.net/${dbname}?retryWrites=true&w=majority`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const configs = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  cached.promise = mongoose.connect(uri, configs).then((mongoose) => {
    return mongoose;
  });

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connect;

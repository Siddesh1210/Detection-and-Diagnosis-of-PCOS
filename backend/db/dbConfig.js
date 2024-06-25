import mongoose from "mongoose";
async function dbConfig() {
  await mongoose
    .connect(`${process.env.DB_URI}/${process.env.DB_Name}`)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Error connecting to DB : " + err.message));
}

export default dbConfig;

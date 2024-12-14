import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionURL = `mongodb+srv://sanketmane:GKrR2XTm5p0UKdTk@cluster101.wugfw.mongodb.net/`;
    // const connectionURL = `mongodb+srv://sanketmane159:IycQU6qwMrQxuxw6@cluster0.wugfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose
      .connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB connection successfull"))
      .catch((error) => console.log(`Failed to connect DB: ${error.message}`));
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

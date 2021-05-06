const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://yumannasim:YuM@1997@cluster0.mgl9y.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`Connection is Sucessful`);
  })
  .catch((e) => {
    console.log(`No Connection`);
  });
//"mongodb://localhost:27017/tvastraUser"
// process.env.MONGODB_URI ||

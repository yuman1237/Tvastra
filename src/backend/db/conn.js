const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/tvastraUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connection is Sucessful`);
  })
  .catch((e) => {
    console.log(`No Connection`);
  });

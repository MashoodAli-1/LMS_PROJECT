import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

//!  create server
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
  connectDB();
});

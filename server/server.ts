import { app } from "./app";
require("dotenv").config();

//!  create server
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});

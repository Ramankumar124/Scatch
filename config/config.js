const mongoose = require("mongoose");
const config=require('config');
const dbgr=require('debug')("development:mongoose");
mongoose
  .connect(`${config.get("MONGODB_URL")}/Scatch`)
  .then(function () {
    dbgr("DB is conneceted");
  })
  .catch(function (err) {
    dbgr(err);
  });

  module.exports=mongoose.connection;
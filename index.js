const express = require("express");
const path = require('path')
require("dotenv").config();
const httpStatusText = require("./utils/httpStatusText");
const app = express();
const cors=require('cors') 
app.use ('/uploads', express.static(path.join(__dirname , 'uploads')));
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("mongdb server started");
});
app.use(cors())
app.use(express.json()); //body parser
// ===== CRUD (Create - Read - Update - Delete) ======
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
app.use("/api/courses", coursesRouter);
app.use ('/api/users',usersRouter );
// global error handeler
app.use ((error,req, res , next)=>{
  res.status(error.statusCode || 500).json({status:error.statusText ||httpStatusText.ERROR , message:error.message})
})

app.listen(process.env.PORT || 5001, () => {
  console.log("listening on port 5001");
});
 
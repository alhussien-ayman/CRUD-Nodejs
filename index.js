const express = require("express");
const app = express();
app.use(express.json()); //body parser
// ===== CRUD (Create - Read - Update - Delete) ======
const coursesRouter = require ('./routes/courses.route')
app.use ('/api/courses', coursesRouter)

app.listen(5001, () => {
  console.log("listening on port 5001");
});
 
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ title: ["Hi We Something"] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

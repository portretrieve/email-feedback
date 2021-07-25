const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ title: ["Hi We have added Something"] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

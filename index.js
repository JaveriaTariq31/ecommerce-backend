const express = require('express');
const app = express();

app.get("/user", (req, res) => {
  res.json
  ({
    name: "Ali", 
    role: "Student" 
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
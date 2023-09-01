const express = require("express");

const app = express();

app.use(express.json());

const PORT = 4000;

async function start() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();

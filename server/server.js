const express = require("express");
const cors = require("cors");
const { getRoster } = require("./utils/index");

const app = express();
const port = 2000;

app.use(cors());

app.get("/", (req, res) => res.send("API is healthy"));
app.get("/get/roster", async (req, res) => {
  const rosterUrl = {
    url:
      "https://draftwizard.fantasypros.com/football/cheat-sheets/rankings/?&scoring=HALF&tab=1",
    tableLocStr: "div.SingleCheatSheet div.LiveCheatSheet"
  };
  const roster = await getRoster(rosterUrl);
  res.json(roster);
});

app.listen(port, () => console.log(`listening on port: ${port}`));
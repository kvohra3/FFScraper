const express = require("express");
const cors = require("cors");
const rosterUrl = {
  url:
    "https://draftwizard.fantasypros.com/football/cheat-sheets/rankings/?&scoring=HALF&tab=1",
  tableLocStr: "div.SingleCheatSheet div.LiveCheatSheet"
};
const { getRoster } = require("../index");

const app = express();
const port = 2000;

app.use(cors());

app.get("/get/roster", async (req, res) => {
  const roster = await getRoster(rosterUrl);
  console.log(roster);
  res.json(roster);
});
app.listen(port, () => console.log(`listening on port: ${port}`));

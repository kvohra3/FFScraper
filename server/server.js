const express = require("express");
const path = require("path");
const cors = require("cors");
const { getRoster } = require("./utils/index");
const { getRankings } = require("./getRankings/index");

const app = express();
const port = process.env.PORT || 2000;

// //Static file declaration
// app.use(express.static(path.join(__dirname, "/../client/build")));
// //production mode
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/../client/build")));
//   app.get("*", (req, res) => {
//     res.sendfile(path.join((__dirname = "/../client/build/index.html")));
//   });
// }
// //build mode
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/public/index.html"));
// });

app.use(cors());

app.get("/", (req, res) => res.send("API is healthy"));
app.get("/get/roster", async (req, res) => {
  const rosterUrl = {
    url:
      "https://draftwizard.fantasypros.com/football/cheat-sheets/rankings/?&scoring=HALF&tab=1",
    tableLocStr: "div.SingleCheatSheet div.LiveCheatSheet"
  };
  const roster = await getRoster(rosterUrl);
  const rankings = await getRankings(roster);
  res.json(roster.map(player => ({ ...player, rank: rankings[player.id] })));
});

app.listen(port, () => console.log(`listening on port: ${port}`));

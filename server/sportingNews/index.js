const { scrape } = require("../utils/index");

const teamMap = team => {
  if (!team) return team;
  const teamLowerCase = team.toLowerCase();
  switch (teamLowerCase) {
    case "cardinals":
      return "ARI";
    case "falcons":
      return "ATL";
    case "ravens":
      return "BAL";
    case "bills":
      return "BUF";
    case "panthers":
      return "CAR";
    case "bears":
      return "CHI";
    case "bengals":
      return "CIN";
    case "browns":
      return "CLE";
    case "cowboys":
      return "DAL";
    case "broncos":
      return "DEN";
    case "lions":
      return "DET";
    case "packers":
      return "GB";
    case "texans":
      return "HOU";
    case "colts":
      return "IND";
    case "jaguars":
      return "JAC";
    case "chiefs":
      return "KC";
    case "chargers":
      return "LAC";
    case "rams":
      return "LAR";
    case "dolphins":
      return "MIA";
    case "vikings":
      return "MIN";
    case "patriots":
      return "NE";
    case "saints":
      return "NO";
    case "giants":
      return "NYG";
    case "jets":
      return "NYJ";
    case "raiders":
      return "OAK";
    case "eagles":
      return "PHI";
    case "steelers":
      return "PIT";
    case "49ers":
      return "SF";
    case "seahawks":
      return "SEA";
    case "buccaneers":
      return "TB";
    case "titans":
      return "TEN";
    case "redskins":
      return "WAS";
    default:
      return team;
  }
};

const generateIDForD = defense => {
  console.log(defense);
  let [rank, name, position, team] = defense;
  const names = name.split(" ");
  team = teamMap(names[names.length - 1]);
  return names.reduce((acc, cv, index) => {
    if (index < 2) {
      acc = acc + cv[0];
      return acc;
    }
    return acc;
  }, `D_${team}_`);
};
const getSportingNewsRankings = async urlObj => {
  const data = await scrape(urlObj);
  return data.reduce((acc, cv) => {
    let [rank, name, position, team] = cv;
    team = teamMap(team);
    const id = position.includes("D")
      ? generateIDForD(cv)
      : name.split(" ").reduce((acc, cv, index) => {
          if (index < 2) {
            acc = acc + cv[0];
            return acc;
          }
          return acc;
        }, `${position}_${team}_`);
    acc[id] = { rank: parseInt(rank) };
    return acc;
  }, {});
};

module.exports = {
  getSportingNewsRankings
};

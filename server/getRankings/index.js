const { getFantasyProsRankings } = require("../fantasyPros/index");
const mock = require("../../client/src/MOCK_DATA/roster.json");
const fantasyProsUrls = [
  {
    url: "https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php",
    tableLocStr: "table#rank-data.player-table tbody tr"
  }
];

const averageRankings = (current, rankings) => {
  const hash = current.reduce((acc, cv) => {
    acc[cv.id] = cv.rank;
    return acc;
  }, {});

  rankings.forEach(player => {
    console.log(player.id, player.rank, hash[player.id]);
    if (hash[player.id]) {
      if (hash[player.id] === -1) {
        hash[player.id] = player.rank;
      } else {
        hash[player.id] = (hash[player.id] + player.rank) / 2;
      }
    }
  });
  console.log(hash);
};

const getRankings = async currentRankings => {
  const fantasyProsRankings = await getFantasyProsRankings(fantasyProsUrls[0]);
  averageRankings(currentRankings, fantasyProsRankings);
};

getRankings(mock).then(data => data);

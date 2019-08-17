const { getFantasyProsRankings } = require("../fantasyPros/index");
const { getEspnData } = require("../espn/index");
const mock = require("../../client/src/MOCK_DATA/roster.json");

const espnUrls = [
  {
    url:
      "https://www.espn.com/fantasy/football/story/_/id/25759239/fantasy-football-2019-updated-top-200-ppr-rankings-matthew-berry",
    tableLocStr: "table tbody tr"
  },
  {
    url:
      "https://www.espn.com/fantasy/football/story/_/id/26415022/fantasy-football-updated-2019-ppr-rankings-mike-clay",
    tableLocStr: "table tbody tr"
  },
  {
    url:
      "https://www.espn.com/fantasy/football/story/_/id/26701720/fantasy-football-updated-2019-ppr-rankings-tristan-h-cockcroft",
    tableLocStr: "table tbody tr"
  },
  {
    url:
      "https://www.espn.com/fantasy/football/story/_/id/25676188/2019-updated-fantasy-football-ppr-rankings-eric-karabell",
    tableLocStr: "table tbody tr"
  },
  {
    url:
      "https://www.espn.com/fantasy/football/story/_/id/25848947/2019-updated-fantasy-football-ppr-rankings-field-yates",
    tableLocStr: "table tbody tr"
  }
];

const fantasyProsUrls = [
  {
    url: "https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php",
    tableLocStr: "table#rank-data.player-table tbody tr"
  }
];

const averageRankings = (hash, rankings = {}) => {
  const player_ids = Object.keys(hash);
  player_ids.forEach(id => {
    if (hash[id] > 999 && rankings[id] && rankings[id].rank) {
      hash[id] = rankings[id].rank;
    } else if (rankings[id] && rankings[id].rank) {
      hash[id] = (hash[id] + rankings[id].rank) / 2;
    }
  });

  return hash;
};

const getRankings = async currentRankings => {
  let hash = currentRankings.reduce((acc, cv) => {
    acc[cv.id] = cv.rank;
    return acc;
  }, {});
  const espnRankings = await Promise.all(
    espnUrls.map(async urlObj => await getEspnData(urlObj))
  );
  hash = espnRankings.reduce(averageRankings, hash);
  return hash;
};

// getRankings(mock).then(data => console.log(data));
module.exports = {
  getRankings
};

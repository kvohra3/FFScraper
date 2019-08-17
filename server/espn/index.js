const { scrape } = require("../utils/index");
// const espnUrls = [
//   //   {
//   //     url:
//   //       "https://www.espn.com/fantasy/football/story/_/id/25759239/fantasy-football-2019-updated-top-200-ppr-rankings-matthew-berry",
//   //     tableLocStr: "table tbody tr"
//   //   },
//   {
//     url:
//       "https://www.espn.com/fantasy/football/story/_/id/26415022/fantasy-football-updated-2019-ppr-rankings-mike-clay",
//     tableLocStr: "table tbody tr"
//   }
//   //   {
//   //     url:
//   //       "https://www.espn.com/fantasy/football/story/_/id/26701720/fantasy-football-updated-2019-ppr-rankings-tristan-h-cockcroft",
//   //     tableLocStr: "table tbody tr"
//   //   },
//   //   {
//   //     url:
//   //       "https://www.espn.com/fantasy/football/story/_/id/25676188/2019-updated-fantasy-football-ppr-rankings-eric-karabell",
//   //     tableLocStr: "table tbody tr"
//   //   },
//   //   {
//   //     url:
//   //       "https://www.espn.com/fantasy/football/story/_/id/25848947/2019-updated-fantasy-football-ppr-rankings-field-yates",
//   //     tableLocStr: "table tbody tr"
//   //   }
// ];

const getEspnData = async urlObj => {
  try {
    const data = await scrape(urlObj);
    return data.reduce((acc, cv) => {
      if (cv.length < 3) {
        return acc;
      }
      if (cv.length === 5) {
        // mike clay
        const [rankAndName, position, team, bye, posRank] = cv;
        const [rank, names] = rankAndName.split(". ");
        const id = names.split(" ").reduce((acc, cv, index) => {
          if (index < 2) {
            acc = acc + cv[0];
            return acc;
          }
          return acc;
        }, `${position.includes("D") ? "D" : position}_${team}_`);

        acc[id] = {
          rank: parseInt(rank)
        };
        return acc;
      }
      if (cv.length > 3) {
        return acc;
      }

      let [rankAndName, team, position] = cv;
      if (!position.match(/[A-Z]/g)) {
        return acc;
      }
      position = position.replace(/[0-9]/g, "");
      const [rank, fullName] = rankAndName.split(". ");
      const id = fullName.split(" ").reduce((acc, cv, index) => {
        if (index < 2) {
          acc = acc + cv[0];
          return acc;
        }
        return acc;
      }, `${position.includes("D") ? "D" : position}_${team}_`);

      acc[id] = {
        team,
        position,
        rank: parseInt(rank),
        name: {
          fullName
        }
      };
      return acc;
    }, {});
  } catch (err) {
    throw new Error(err);
  }
};

// espnUrls.forEach(async urlObj => console.log(await getEspnData(urlObj)));
module.exports = {
  getEspnData
};

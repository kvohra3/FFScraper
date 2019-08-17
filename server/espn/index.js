const { scrape } = require("../utils/index");

const getEspnData = async urlObj => {
  try {
    const data = await scrape(urlObj);
    return data.reduce((acc, cv) => {
      if (cv.length < 3) {
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
      }, `${position}_${team}_`);

      acc[id] = {
        id,
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

  //   console.log("rankings", rankings);
};
module.exports = {
  getEspnData
};

const { scrape } = require("../utils/index");

const getFantasyProsRankings = async urlObj => {
  try {
    const players = await scrape(urlObj);
    return players.reduce(
      (acc, [rank, wsid, nameAndTeam, posRank, byeWeek, ...stats], index) => {
        if (!rank || !posRank || !byeWeek || !nameAndTeam) {
          return acc;
        }
        const position =
          posRank[0] === "K" || posRank[0] === "D"
            ? posRank[0]
            : posRank.substring(0, 2);
        console.log("nameAndTeam", nameAndTeam);

        const delims = nameAndTeam.match(/[a-z][A-Z]./);

        const name = {
          firstName: "",
          middleName: "",
          lastName: "",
          fullName: ""
        };
        let id = "";
        if (delims) {
          const newStr = `${delims[0]} ${delims[0].substring(1)}`;
          nameAndTeam = nameAndTeam.replace(delims[0], newStr);
          const playerInfo = nameAndTeam.split(" ");

          if (playerInfo.length > 7) {
            name.firstName = playerInfo[0];
            name.middleName = playerInfo[1];
            name.lastName = playerInfo[2];
            name.fullName = `${name.firstName} ${name.middleName} ${
              name.lastName
            }`;
          } else {
            name.firstName = playerInfo[0];
            name.lastName = playerInfo[1];
            name.fullName = `${name.firstName} ${name.lastName}`;
          }
          playerInfo.pop();
          playerInfo.pop();
          const team = playerInfo.pop();
          id = `${position}_${team}_${name.firstName[0]}${
            name.middleName[0] ? name.middleName[0] : ""
          }${name.lastName[0]}`;
        }

        acc.push({
          rank,
          byeWeek,
          position,
          name,
          id
        });
        return acc;
      },
      []
    );
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  getFantasyProsRankings
};

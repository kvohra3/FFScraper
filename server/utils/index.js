const fetch = require("node-fetch");
const cheerio = require("cheerio");

const wrUrls = [
  {
    url: "http://www.espn.com/nfl/statistics/player/_/stat/receiving",
    tableLocStr: "table tbody tr"
  }
];
const sportingNewsUrls = [
  {
    url:
      "https://www.sportingnews.com/us/fantasy/news/fantasy-ppr-rankings-top-200-cheat-sheet-point-per-reception-sleepers-busts-projections-draft-strategy-tiers-draft-kit/11feetzrpunlr1j20ww0ck5052",
    tableLocStr: "table tbody tr"
  }
];

const byeWeekUrl = {
  url: "http://www.espn.com/nfl/schedulegrid",
  tableLocStr: "table tbody tr"
};

const getByeWeeks = async urlObj => {
  /* 
  fetches nfl schedule and gets each team's bye week
  */
  const schedule = await scrape(urlObj);
  const byeWeek = schedule.reduce((acc, cv, index) => {
    if (index < 2) {
      return acc;
    }
    const teamdata = { [cv[0]]: cv.findIndex(ele => ele === "BYE") };
    return { ...acc, ...teamdata };
  }, {});
  return byeWeek;
};

const scrape = async ({ url, tableLocStr }) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    console.log(`------------- ${url} -----------------`);
    const $ = cheerio.load(html);
    const table = [];

    $(tableLocStr).each(function(i, el) {
      const row = [];
      $(this)
        .children()
        .each(function(i, el) {
          const text = $(this).text();
          row.push(text);
        });
      table.push(row);
    });
    return table;
  } catch (err) {
    console.log(`Error fetching ${url}`, err);
  }
};

const setUpPlayer = (str, position, byeWeeks, rankings) => {
  /*
  parse name given from draftwizard and return player obj

  return {
    id: position_team_playerIntials
    name: {
      firstName: names[0]
      lastName: names[last]
      middleName: names[1-last-1]
      fullName
    }
    position    
    byeWeek
    rank => lower is better everyone starts at 1
  }
  */
  const isD = position === "D";
  const [name, team] = str.split(", ");
  const [_, fullName] = name.split(". ");
  const names = fullName.split(" ");

  // generate player id
  // TODO: update id to be position_team_`{firstIntial}{lastInital}{lastSecondLetter}`
  const id = names.reduce((acc, cv, index) => {
    if (index < 2) {
      acc = acc + cv[0];
      return acc;
    }
    return acc;
  }, `${position}_${team}_`);

  // split name into sections if position not D
  const firstName = isD ? "" : names.shift();
  const lastName = isD ? "" : names.pop();
  const middleName = isD
    ? ""
    : names.reduce((acc, cv) => {
        return acc.length > 0 ? `${acc} ${cv}` : `${acc}${cv}`;
      }, "");

  // get bye week for team
  const byeWeek = byeWeeks[team];

  return {
    id,
    team,
    name: {
      firstName,
      lastName,
      middleName,
      fullName
    },
    position,
    byeWeek,
    rank: 9999
  };
};

const getRoster = async urlObj => {
  // get bye weeks
  const byeWeeks = await getByeWeeks(byeWeekUrl);
  const [QB, RB, WR, TE, K, D] = await scrape(urlObj);
  const fullRawRoster = { QB, RB, WR, TE, K, D };
  const fullRoster = Object.entries(fullRawRoster).reduce(
    (acc, [position, players]) => {
      const playersArr = players.map(player =>
        setUpPlayer(player, position, byeWeeks)
      );
      return [...acc, ...playersArr];
    },
    []
  );
  return fullRoster;
};

module.exports = {
  getRoster,
  getByeWeeks,
  scrape,
  setUpPlayer
};

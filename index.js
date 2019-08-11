const fetch = require("node-fetch");
const cheerio = require("cheerio");

const locations = [
  {
    url: "http://www.espn.com/nfl/statistics/player/_/stat/receiving",
    tableLocStr: "table tbody tr"
  },
  {
    url:
      "http://www.espn.com/fantasy/football/story/_/page/18RanksPreseason300PPR/2018-fantasy-football-ppr-rankings-top-300",
    tableLocStr: "table tbody tr"
  },
  {
    url:
      "https://www.sportingnews.com/us/fantasy/news/fantasy-ppr-rankings-top-200-cheat-sheet-point-per-reception-sleepers-busts-projections-draft-strategy-tiers-draft-kit/11feetzrpunlr1j20ww0ck5052",
    tableLocStr: "table tbody tr"
  },
  {
    url: "https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php",
    tableLocStr: "table#rank-data.player-table tbody tr"
  },
  {
    url:
      "https://draftwizard.fantasypros.com/football/cheat-sheets/rankings/?&scoring=HALF&tab=1",
    tableLocStr: "div.SingleCheatSheet div.LiveCheatSheet"
  }
];

const scrape = async ({ url, tableLocStr }) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    // console.log("html:", html);

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
      console.log(row);
      console.log();
      table.push(row);
    });
    return table;
  } catch (err) {
    console.log(`Error fetching ${url}`, err);
  }
};

locations.forEach(location => scrape(location));

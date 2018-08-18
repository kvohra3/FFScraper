const request = require('request');
const cheerio = require('cheerio');


const locations = [
  {
    url: 'http://www.espn.com/nfl/statistics/player/_/stat/receiving',
    tableLocStr:'table tbody tr'
  },
  {
    url: 'http://www.espn.com/fantasy/football/story/_/page/18RanksPreseason300PPR/2018-fantasy-football-ppr-rankings-top-300',
    tableLocStr:'table tbody tr'
  },
  {
    url: 'http://www.sportingnews.com/us/fantasy/sport/news/fantasy-football-ppr-rankings-2018-cheat-sheet-draft-strategy-tiers-sleepers-busts-targets-best-players-season-outlook-projections-top-picks/k36acqdekdl71uswdywe9t492',
    tableLocStr:'table tbody tr'
  },
  {
    url: 'https://www.fantasypros.com/nfl/rankings/half-point-ppr-cheatsheets.php',
    tableLocStr: 'table#rank-data.player-table tbody tr'
  },
  {
    url: 'https://draftwizard.fantasypros.com/football/cheat-sheets/rankings/?&scoring=HALF&tab=1',
    tableLocStr: 'div.SingleCheatSheet div.LiveCheatSheet'
  }
]

const scrape = async ({ url, tableLocStr }) => {
  
  await request(url, (error, response, html) => {
    console.log(`------------- ${url} -----------------`)
    const $ = cheerio.load(html);
    const table = [];

    $(tableLocStr).each(function (i, el) {
      const row = []
      $(this).children().each(function(i, el) {
        const text = $(this).text(); 
        row.push(text);
      })
      console.log(row)
      console.log()
      table.push(row);
    });
    return table;
  })
}

locations.forEach(location => scrape(location));



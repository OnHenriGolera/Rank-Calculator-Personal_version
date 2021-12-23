const ranking_links = require("./data/json/ranking_links.json")
const { scrapeFFE } = require("./utilities/scrapper")
const categories = Object.keys(ranking_links)
const RankUpdater = require("./utilities/updateRanks")

// Update
RankUpdater.updateRanks(ranking_links)

const { scraper } = require('./scraper')
const stringSimilarity = require("string-similarity");


function whiskeyScraper (){ 
    this.whiskeys = {}
}

whiskeyScraper.prototype.getAll = async () => {
    if (!this.whiskeys) {
        this.whiskeys = await scraper()
    }
    return this.whiskeys
}

whiskeyScraper.prototype.getOneStrict = async (str) => {
    if (!this.whiskeys) {
        this.whiskeys = await scraper()
    }
    return this.whiskeys[str]
}
whiskeyScraper.prototype.getOne = async (str) => {
    if (!this.whiskeys) {
        this.whiskeys = await scraper()
    }
    const matches = stringSimilarity.findBestMatch(str, Object.keys(this.whiskeys))
    return this.whiskeys[matches.bestMatch.target]
}

whiskeyScraper.prototype.search = async (str, rating = .5) => {
    const result = {}
    if (!this.whiskeys) {
        this.whiskeys = await scraper()
    }

    const matches = stringSimilarity.findBestMatch(str, Object.keys(this.whiskeys))
    for (element in matches.ratings){
        if(matches.ratings[element].rating > rating){
            this.whiskeys[matches.ratings[element].target].searchRating = matches.ratings[element].rating
            result[matches.ratings[element].target] = this.whiskeys[matches.ratings[element].target]
        }
    }

    return result
}

module.exports = whiskeyScraper
const cheerio = require('cheerio');
const axios = require('axios')


async function scraper(){
    const {data} = await axios.get("https://www.whisky-hamster.com/catalog?onSale=true&limit=96&inc=96&viewType=table")
    const $ = cheerio.load(data)
    const results = {}
    $('.sc-fmcixO').each((index, element) => {
        results[$(element).find('.sc-fXeWgy').text()] = {
            name: $(element).find('.sc-fXeWgy').text(),
            price: $(element).find('.sc-jlRMkV').text(),
            proof: $(element).find('.sc-gUQueJ').text()
        }   
    });
    return results
}

module.exports= {scraper}
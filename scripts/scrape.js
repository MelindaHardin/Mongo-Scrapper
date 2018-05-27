var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

  request("http://www.miamiherald.com/", function (err, res, body) {

    var $ = cheerio.load(body)

    var articles = [];

    $(".teaser").each(function (i, element) {

      var kicker = $(this).children("p.kicker").text().trim();
      var head = $(this).children("h4.title").text().trim();

      if (kicker && head) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var kickerNeat = kicker.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: kickerNeat,
          summary: headNeat
        };
        articles.push(dataToAdd);
      }

    });
    cb(articles);
  });

}

module.exports = scrape;
const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const url =
  "https://www.groebmair-immobilien.de/immobilien-vermarktungsart/kauf/";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const properties = [];
    $(".property-details", html).each(function () {
      const propertyTitle = $(this).find(".property-title").text();
      const propertySubTitle = $(this).find(".property-subtitle").text();
      const propertyDetails = $(this).find(".row").text();
      const link = $(this).find("a").attr("href");
      properties.push({
        propertyTitle,
        propertySubTitle,
        propertyDetails,
        link,
      });
    });
    console.log(properties);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server running on PORT ${PORT}"));

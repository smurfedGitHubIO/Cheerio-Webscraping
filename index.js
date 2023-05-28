const {load} = require('cheerio');
// import {load} from 'cheerio'; 
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 5000;

/**
 * @todo: fix deprecated cheerio
 */

app.listen(PORT, async (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at PORT ${PORT}`);
    try {
      (
        async () => {
          const resp = await fetch('https://diksiyonaryo.ph/search/saysay');
          const body = await resp.text();
          const $ = load(body);
          console.log($('.word').text());
        }
      )();
    } catch (error) {
      console.log(error);
    }
  }
});

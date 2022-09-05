const cheerio = require('cheerio').default;
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
          const resp = await fetch('https://atcoder.jp/contests/abc266/submissions?f.Task=abc266_a&f.User=smurfedAtcode');
          const body = await resp.text();
          const val = cheerio.load(body);
          const wah = val('tbody');
          console.log(wah.html());
        }
      )();
    } catch (error) {
      console.log(error);
    }
  }
});

/**
 * Take note of link form
 * https://atcoder.jp/contests/($1)/submissions?f.Task=($2)&f.User=($3)
 * $1 = contest ID (abc###, arc###, agc###)
 * $2 = problem ID (abc###_a ...)
 * $3 = username
 */
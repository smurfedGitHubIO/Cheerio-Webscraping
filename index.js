const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const util = require('util');
const requestPromise = util.promisify(request);
const app = express();

const PORT = process.env.PORT || 5000;

const cheerioRequest = async (link) => {
  return new Promise( (resolve, reject) => {
    requestPromise(link,
      (err, response, html) => {
        if (!err && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const tbody = $('tbody');
          if (tbody.html() === null) {
            reject();
          } else {
            resolve();
          }
        } else {
          reject();
        }
      }
    )
  }).then( () => {
    return true;
  }).catch( () => {
    return false;
  });
}

app.listen(PORT, async (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at PORT ${PORT}`);
    try {
      const val = await cheerioRequest("https://atcoder.jp/contests/abc266/submissions?f.Task=abc266_a&f.User=smurfedAtCoder");
      console.log(val);
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
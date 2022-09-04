const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const util = require('util');
const requestPromise = util.promisify(request);
const app = express();

const PORT = process.env.PORT || 5000;

const func = async (link) => {
  new Promise( (resolve, reject) => {
    request(link,
      (err, resp, html) => {
        if (!err && resp.statusCode == 200) {
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
  })
  .then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
}

const func2 = async (link) => {
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
    console.log("wah");
    return true;
  }).catch( () => {
    console.log("weg");
    return false;
  });
}

app.listen(PORT, async (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at PORT ${PORT}`);
    try {
      const val = await func2("https://atcoder.jp/contests/abc266/submissions?f.Task=abc266_a&f.User=smurfedAtCode");
      console.log(val);
    } catch (error) {
      console.log(error);
    }
    
  }
})
const fs = require("fs");
const axios = require("axios");

const urls = [];

fs.mkdirSync("out");

for (const url of urls) {
  axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then(({ data }) => {
      const filename = url.split("/").at(-1).split("?")[0];
      fs.writeFileSync(`out/${filename}`, data);
      console.log(`Downloaded ${filename} successfully.`);
    })
    .catch((err) => {
      console.error(`an error ocurred while downloading ${url}`, err);
    });
}

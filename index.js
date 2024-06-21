const fs = require("fs");
const axios = require("axios");
const { exec } = require("child_process");

const urls = [
  "https://s14.knigavuhe.org/2/audio/23127/01-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/02-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/03-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/04-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/05-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/06-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/07-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/08-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/09-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/10-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/11-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/12-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/13-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/14-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/15-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/16-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/17-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/18-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/19-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/20-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/21-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/22-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/23-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/24-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/25-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/26-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/27-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/28-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/29-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/30-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/31-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/32-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/33-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/34-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/35-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/36-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/37-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/38-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/39-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/40-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/41-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/42-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/43-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/44-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/45-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/46-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/47-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/48-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/49-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/50-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/51-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/52-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/53-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/54-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/55-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/56-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/57-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/58-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/59-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/60-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/61-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/62-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/63-vsegda-govori-vsegda.mp3",
  "https://s14.knigavuhe.org/2/audio/23127/64-vsegda-govori-vsegda.mp3",
];

const directory = "vsegda-govori-vsegda";

const writePathFile = async (names) => {
  try {
    await fs.writeFile(`path/${directory}.txt`, names.join("\n"), (err) => {
      if (err) {
        console.error("err writing file", err);
      } else {
        console.log(`Array written to path/${directory}.txt successfully.`);
      }
    });

    if (urls.length === 1) {
      copyFileToMediaFolder();

      fs.rm(`./${directory}`, { recursive: true, force: true }, (error) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log(`${directory} is deleted`);
        return;
      });
    }

    concatIntoOneFile(directory);

    return;
  } catch (error) {
    console.error("error ocurred while writing path file", error);
  }
};

const concatIntoOneFile = (fileName) => {
  const ffmpegCommand = `ffmpeg.exe -f concat -safe 0 -i .\\path\\${fileName}.txt .\\media\\${fileName}.mp3`;

  console.log("run ffmpeg", ffmpegCommand);
  exec(ffmpegCommand, (error) => {
    if (error) {
      console.error(`Error executing FFmpeg: ${error.message}`);
      return;
    }
    console.log("FFmpeg command executed successfully.");
    try {
      fs.rm(`./${directory}`, { recursive: true, force: true }, (error) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log(`${directory} is deleted`);
        return;
      });
    } catch (err) {
      console.error("Error occurred:", err);
    }
  });
};

const copyFileToMediaFolder = () => {
  console.log("copy file start");
  const command = `copy '.\\${directory}\\${directory}.mp3' C:\\Users\\iluha\\temp\\Ilya\\bookDownloader\\media`;
  exec(command, (error) => {
    if (error) {
      console.log("error copy file to media folder", error);
      return;
    }
    console.log("file copied to media", directory);
    return;
  });
};

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const names = [];

console.log("star downloading", directory);

const bookPromises = urls.map((url) => {
  return axios.get(url, {
    responseType: "arraybuffer",
  });
});

// Wait for all requests to complete
Promise.all(bookPromises)
  .then((responses) => {
    responses.forEach(({ data }, index) => {
      const filename = decodeURIComponent(urls[index])
        .split("/")
        .at(-1)
        .split("?")[0]
        .replaceAll(" ", "_")
        .replaceAll(",", "")
        .replace("!", "");

      const path = `${directory}/${filename}`;

      fs.writeFileSync(path, data);

      console.log(`Downloaded ${filename} successfully.`);

      names.push(`file ../${path}`);
    });

    // Now that all requests are done, call writePathFile
    writePathFile(names);
  })
  .catch((err) => {
    console.error("An error occurred while downloading files:", err);
  });

// Workaround at knigavuhe
// will return array of the book urls
// cur.bookPlayer.playlist.map((i) => i.url);
// https://knigavuhe.org/book/doktor-danilov-v-morge-ili-neverojatnye-budni-patologoanatoma/ - latest downloaded book

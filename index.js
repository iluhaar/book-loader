const fs = require("fs");
const axios = require("axios");
const { exec } = require("child_process");

const urls = [];

const directory = "";

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

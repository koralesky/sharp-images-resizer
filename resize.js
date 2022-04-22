const fs = require("fs");
const process = require("process");
const path = require("path");
const glob = require("glob");

const dir = process.argv[2];

const input_path = path.join("./input", "*.jpg");
const output_path = path.join("output");
console.log(input_path);

const sharp = require("sharp");

glob(input_path, function (err, files) {
  if (err != null) {
    throw err;
  }
  fs.mkdirSync(output_path, { recursive: true });
  files.forEach(function (inputFile) {
    sharp(inputFile)
      .resize(1980)
      .jpeg({ mozjpeg: true })
      .toFile(
        path.join(
          output_path,
          path.basename(inputFile, path.extname(inputFile)) + ".jpg"
        ),
        (err, info) => {
          if (err === null) {
            console.log("successfully compressed " + inputFile);
          } else {
            throw err;
          }
        }
      );
  });
});

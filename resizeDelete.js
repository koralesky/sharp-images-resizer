const fs = require("fs");
const process = require("process");
const path = require("path");
const glob = require("glob");

const dir = process.argv[2];

const input_path = path.join("./in", "*.jpg");
const output_path = path.join("min");
console.log(input_path);

const sharp = require("sharp");

glob(input_path, function (err, files) {
  if (err != null) {
    throw err;
  }
  fs.mkdirSync(output_path, { recursive: true });
  files.forEach(function (inputFile) {
    sharp(inputFile)
      .jpeg({ mozjpeg: true, quality: 60, force: true })
      .toFile(
        path.join(
          output_path,
          path.basename(inputFile, path.extname(inputFile)) + ".jpg"
        ),
        (err, info) => {
          if (err === null) {
            fs.unlink(inputFile, (err2) => {
              if (err2) throw err2;
              console.log("successfully compressed and deleted " + inputFile);
            });
          } else {
            throw err;
          }
        }
      );
  });
});

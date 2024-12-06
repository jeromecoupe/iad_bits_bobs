import * as fs from "node:fs";
import * as path from "node:path";
import { globSync } from "glob";
import sharp from "sharp";

const config = {
  allowedFormats: ["jpg", "jpeg", "webp", "avif", "png", "gif"],
};

const transforms = [
  {
    // 1024x768 blogposts list
    srcGlob: "./src/assets/img/blogposts/*",
    dist: "./dist/assets/img/blogposts/1024x768/",
    formats: ["jpg"],
    options: {
      width: 1024,
      height: 768,
      fit: "cover",
    },
  },
  {
    // 800x600 blogposts (lists)
    srcGlob: "./src/assets/img/blogposts/*",
    dist: "./dist/assets/img/blogposts/800x600/",
    formats: ["jpg"],
    options: {
      width: 800,
      height: 600,
      fit: "cover",
    },
  },
  {
    // 2000x1125 blogposts (detail)
    srcGlob: "./src/assets/img/blogposts/*",
    dist: "./dist/assets/img/blogposts/2000x1125/",
    formats: ["jpg"],
    options: {
      width: 2000,
      height: 1125,
      fit: "cover",
    },
  },
  {
    // 1500x844 blogposts (detail)
    srcGlob: "./src/assets/img/blogposts/*",
    dist: "./dist/assets/img/blogposts/1500x844/",
    formats: ["jpg"],
    options: {
      width: 1500,
      height: 844,
      fit: "cover",
    },
  },
  {
    // 1024x576 blogposts (detail)
    srcGlob: "./src/assets/img/blogposts/*",
    dist: "./dist/assets/img/blogposts/1024x576/",
    formats: ["jpg"],
    options: {
      width: 1024,
      height: 576,
      fit: "cover",
    },
  },
  {
    // 1024x1024 blogposts (open graph)
    srcGlob: "./src/assets/img/blogposts/*",
    dist: "./dist/assets/img/blogposts/1024x1024/",
    formats: ["jpg"],
    options: {
      width: 1024,
      height: 1024,
      fit: "cover",
    },
  },
];

/**
 * Create Directory recursively from path
 */
function createDir(path) {
  // return if dir already exists
  if (fs.existsSync(path)) return;
  // create dir
  try {
    fs.mkdirSync(path, { recursive: true });
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Generate images based on transforms object
 */
async function init() {
  // array for promises
  let sharpPromises = [];

  // loop through transforms
  transforms.forEach(async (transform) => {
    let inputGlob = transform.srcGlob;
    let outputDir = transform.dist;
    let formats = transform.formats;
    let options = transform.options;

    // check formats is array
    if (!Array.isArray(formats)) {
      throw new Error(`"formats" in transforms should be an array`);
    }

    // check formats are of allowed types
    formats.forEach((el) => {
      if (!config.allowedFormats.includes(el)) {
        throw new Error(
          `Unknown format: "${el}". Allowed formats are: ${config.allowedFormats.toString()}`
        );
      }
    });

    // Get image files in input directory
    let imagesFiles = globSync(inputGlob);

    // Create output dir
    createDir(outputDir);

    // loop through all images and create Sharp promises
    imagesFiles.forEach((file) => {
      // Create resized images for each specified formats
      formats.forEach((format) => {
        // get input image name
        let inputFileName = path.parse(file).name;

        // build image output path
        let outputPath = path.join(outputDir, `${inputFileName}.${format}`);

        // bail out if image output path exists
        if (fs.existsSync(outputPath)) return;

        // create sharp promises
        try {
          // resize promise
          let sharpPromise = sharp(file).resize(options).toFile(outputPath);

          // push promise to array
          sharpPromises.push(sharpPromise);
        } catch (err) {
          throw new Error(err);
        }
      });
    });
  });

  // resolve all promises in parallel
  try {
    await Promise.all(sharpPromises);
    console.log(`${sharpPromises.length} resized images generated`);
  } catch (err) {
    throw new Error(err);
  }
}

export default init();
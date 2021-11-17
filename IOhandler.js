/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */



const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {

  fs.createReadStream(pathIn)
  .pipe(unzipper.Extract({ path: pathOut}));

  setTimeout(()=>{
    console.log("Extraction operation complete")
},1000);
  

};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 *
 */

let array = [];

const readDir = dir => {
  const directoryPath = path.join(__dirname, 'unzipped');
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        array.push(path.join(directoryPath, file)); 
        
    });
      
   
   
  })

 


};



/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {



for(i = 0; i< array.length - 1; i++)
{
fs.createReadStream(array[i])
.pipe(
  new PNG({
    filterType: 4,
  })
)
.on("parsed", function () {
  for (var i = 0; i < this.height; i++) {
    for (var j = 0; j < this.width; j++) {
      var idx = (i * 4) * this.width + j * 4;

      var avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;

      // invert color
      this.data[idx] = 255 + avg;
      this.data[idx + 1] = 255 + avg;
      this.data[idx + 2] = 255 + avg;

    }
  }

  this.pack().pipe(fs.createWriteStream("./grayscaled/out"+ [i] + ".png"));
});
}
}


module.exports = {
  unzip,
  readDir,
  grayScale
};
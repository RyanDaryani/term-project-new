/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: 
 * 
 * Created Date: 
 * Author:
 * 
 */



var unzip = require("./IOhandler").unzip;
var readDir = require("./IOhandler").readDir;
var grayScale = require("./IOhandler").grayScale;

zipFilePath = `${__dirname}/myfile.zip`;
pathUnzipped = `${__dirname}/unzipped`;
pathProcessed = `${__dirname}/grayscaled`;

unzip(zipFilePath,pathUnzipped);

readDir(pathUnzipped);

setTimeout(()=>{
    grayScale(pathUnzipped,pathProcessed);
},1000);


var fs = require('fs');
var path = require('path');
var config = require('./config');
var helpers = require('./helpers');
var sqlite3 = require('sqlite3').verbose();
var lib = {};
lib.baseDir = path.join(__dirname,'/../'+config.dataDirectory+'/');
lib.baseSQLiteDir = path.join(__dirname,'/../'+config.dbFileDirectory+'/');
lib.dbFile = lib.baseSQLiteDir + config.sqliteDBFile;
lib.sqliteconnect = new sqlite3.Database(lib.dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if(err) throw err;
});
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+config.defaultFileExtension, 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};
lib.delete = function(dir,file,callback){
  fs.unlink(lib.baseDir+dir+'/'+file+config.defaultFileExtension, function(err){
    callback(err);
  });
};
lib.list = function(dir,callback){
  fs.readdir(dir+'/', function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace(config.defaultFileExtension,''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};
module.exports = lib;
var workers = require('./lib/workers');
var app = {};
app.init = function(){
  workers.init();
};
app.init();
module.exports = app;
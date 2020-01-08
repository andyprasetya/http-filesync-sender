var environments = {};
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'sqliteDBFile': 'data.db',
  'dbFileDirectory' : 'db',
  'dataDirectory' : 'data',
  'defaultFileExtension' : '.txt',
  'endPointURL' : 'http://192.168.1.235:3030',
  'refreshInterval' : 1000 * 60 * 1
};
environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'sqliteDBFile': 'data.db',
  'dbFileDirectory' : 'db',
  'dataDirectory' : 'data',
  'defaultFileExtension' : '.txt',
  'endPointURL' : 'http://192.168.1.235:3030',
  'refreshInterval' : 1000 * 60 * 1
};
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;
module.exports = environmentToExport;
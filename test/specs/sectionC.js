var assert = require('assert');
var http = require('http');
var options = {
  host: 'program.abcradio.net.au',
  path: '/api/v1/programs/ppJj0E8g2R.json'
};
var jsonFile = require('../JSON/ppJj0E8g2R.json')

describe('JSON API INTEGRATION TESTS', function() {

// 1) Verify the key/value pairs from the following jSon output
// http://program.abcradio.net.au/api/v1/programs/ppJj0E8g2R.json (note this file is also
// attached as ‘ppJj0E8g2R.json’).
  it('Should fetch JSON file with same key/pairs', function () {

    // hold key/values in separated arrays
    var keysArr = [];
    var valuesArr = [];
    console.log("step1");
      http.get(options, function(res) {
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var responseBody = JSON.parse(body);

            for (key in responseBody) {
              keysArr.push(key) ;
            }

            for (value in responseBody) {
                valuesArr.push(responseBody[value]);
            }

        });
      }).on('error', function(e){
      console.log("Got an error: ", e);
      });
  });
});

// 2) Run the test Programmatically.
// Ref: http://webdriver.io/guide/testrunner/gettingstarted.html#Run-the-test-runner-programmatically

// By including /node_modules/webdriverio/build/launcher we can run the same test againsts different environments.
// "The Launcher class expects as parameter the url to the config file and accepts certain parameters that will
//overwrite the value in the config."
//
// In our case environments have same path only with base URL difference:
// Test Base URL: http://test-program.abcradio.net.au
// Staging Base URL:  http://staging-program.abcradio.net.au
// Test environment: http://test-program.abcradio.net.au/api/v1/programs/ppJj0E8g2R.json
// Staging environment: http://staging-program.abcradio.net.au/api/v1/programs/ppJj0E8g2R.json
//
// Therefore, we can pass different base URL for different stages while keeping the path option the same.


// 3) Run the test with different relative URL.
//
// We can define baseURL as http://program.abcradio.net.au/api/v1/programs/ and loop for each
// relative URL which could be stored in a 'programs.JSON' file.
// Ref: http://webdriver.io/api/protocol/url.html
// // http://example.com/site/relative
// browser.url('relative');

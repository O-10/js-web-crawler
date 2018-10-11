(function(){
  var fs = require('fs');

  var input = JSON.parse(fs.readFileSync('ceps/cepINSS.json'));

  console.log(input);
}())
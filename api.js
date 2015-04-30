var fortune = require('fortune');

var app = fortune({
    db: 'petstore',
    suffix: '.json'
  })
  .resource('issue', {
    description: String,
  });

module.exports = app;

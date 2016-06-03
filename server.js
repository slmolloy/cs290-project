var express = require('express');
var websockets = require('./websockets');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(require('./controllers'));

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on', app.get('port'));
});

websockets.connect(server);
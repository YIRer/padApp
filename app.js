var express =  require('express');
var app = express();
var path = require('path');
var http = require('http');

var html_dir = '/html/';


app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public/html');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(8080,function(){
  console.log('8080 port');
});

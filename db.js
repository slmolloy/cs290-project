// var mongoose = require('mongoose')
// var ObjectId = mongoose.Types.ObjectId
// var url = process.env.MONGOLAB_URI || 'mongodb://localhost/lifting'
// mongoose.connect(url, function () {
//   //console.log('mongodb connected')
// })
// mongoose.toObjectId = function(data) {
//   return new ObjectId(data.toString())
// }

var mysql = require('mysql');
exports.pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var url = process.env.MONGOLAB_URI || 'mongodb://localhost/social'
mongoose.connect(url, function () {
  //console.log('mongodb connected')
})
mongoose.toObjectId = function(data) {
  return new ObjectId(data.toString())
}
module.exports = mongoose
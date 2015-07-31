var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
mongoose.connect('mongodb://localhost/social', function () {
  //console.log('mongodb connected')
})
mongoose.toObjectId = function(data) {
  return new ObjectId(data.toString())
}
module.exports = mongoose
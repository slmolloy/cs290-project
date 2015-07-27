var db = require('../db')
var Post = db.model('Post', {
  username: { type: String, required: true },
  body:     { type: String, required: true },
  viewed:   { type: Boolean, required: true, default: false },
  date:     { type: Date, required: true, default: Date.now }
})
module.exports = Post

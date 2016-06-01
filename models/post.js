var db = require('../db')
var Post = db.model('Post', {
  name:     { type: String, required: true },
  reps:     { type: Number, required: true, default: 0 },
  weight:   { type: Number, required: true, default: 0 },
  date:     { type: Date, required: true, default: Date.now() },
  units:    { type: Number, required: true, default: 1 }
})
module.exports = Post

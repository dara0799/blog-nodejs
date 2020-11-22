const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  //generate timestamps untuk auto assign properties to that values
}, { timestamps: true });

//argument 1 penting krn akan melihat nama argumen tsb
//lalu menjamakkan melihat nama collection tsb dlm database
//lalu kita bisa menggunakan model ini utk komunikasi dengan database
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
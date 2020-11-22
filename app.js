const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//aplikasi berjalan dari atas ke bawah

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://admin2:test2@cluster0.d6coy.gcp.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // listen for requests
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

//ejs template diproses dengan menggunanakan view engine dlm server
//ejs template => ejs view engine => html
//register view engine
//app.set = untuk kita konfigurasi application setting
//express dan ejs secara otomatis mencaari ke dalam folder view
app.set("view engine", "ejs");
//untuk set nama folder dan file yg isinya
// app.set('views', 'myviews');

// middleware & static files
//membuat file yang terdapat di dalam folder public accessible (dapat diakses) dan available (tersedia) di front end (browser)
//pada contoh kasus kali ini file styles yang sudah link di bagian head html dapat diakses
app.use(express.static("public"));
//pass the data from form
//mengirimkan data dari form yg sudah ada url /blogs
//dan dikirimkan melalui objek request object
//accepting data from form
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
// app.get('/add-blog', (req, res) => {
//   //new instance dr blog model
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   })
//   //method than we can access karena sudah deklarasi model blog
//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5f8f067f83321923ec4658d5')
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);
// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create a new blog' });
// });

// app.get('/blogs', (req, res) => {
//   //mongoose otomatis nambahin
//   //createdAt: -1 descending dr yg paling baru ke yang paling lama
//   Blog.find().sort({ createdAt: -1 })
//     .then(result => {
//       res.render('index', { blogs: result, title: 'All blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.post('/blogs', (req, res) => {
//   // console.log(req.body);
//   const blog = new Blog(req.body);

//   blog.save()
//   //save ke database
//     .then(result => {
//       //balik ke halaman home blog awal
//       res.redirect('/blogs');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/blogs/:id', (req, res) => {
//   // id parameter di bawah ini berasal dari :id
//   const id = req.params.id;
//   Blog.findById(id)
//   // result di bawah berdasarkan id
//     .then(result => {
//       res.render('details', { blog: result, title: 'Blog Details' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.delete('/blogs/:id', (req, res) => {
//   const id = req.params.id;
  
//   Blog.findByIdAndDelete(id)
//     .then(result => {
//       //mengirim json ke browser
//       res.json({ redirect: '/blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
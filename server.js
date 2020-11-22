const http = require("http");
const fs = require("fs");
const _ = require("lodash");

//callback func akan berjalan setiap kali ada request
//mempunyai 2 argument yaitu request dan response
//req argument menyimpan permintaan dr user ex: url
//res argument mengembalikan respon ke user
const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  //once = hanya bisa digunakan/direload/dipanggil 1 kali
  const greet = _.once(() => {
    console.log("hello");
  });
  greet();
  greet();

  // set header content type
  //response header
  res.setHeader("Content-Type", "text/html");

  // res.write('<p>hello, ninjas</p>');
  // res.write('<p>hello again, ninjas</p>');
  // res.end();

  // send html file
  //membaca file dan menjadikannya response dlm bentuk html
  //readFile terdapat 2 arg yaitu path(letak folder html yg dituju) dan funct
  // fs.readFile('./views/index.html', (err, data) => {
  //terdapat 2 argument yaitu utk menangkap error dan data (dpt berisi path)
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   }
  //   //res.write(data);
  //   res.end(data);
  // });

  // routing
  //jika route(url) ditambahkan namanya menjadi path+nama halaman
  //statusCode adalah jawaban server website atas permintaan data oleh browser
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      //redirect
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
  }

  // send html
  //membaca file dan menjadikannya response dlm bentuk html
  //readFile terdapat 2 arg yaitu path(letak folder html yg dituju) dan funct
  fs.readFile(path, (err, data) => {
    //terdapat 2 argument yaitu utk menangkap error dan data (dpt berisi path)
    if (err) {
      console.log(err);
      res.end();
    }
    //res.write(data);
    res.end(data);
  });
});

// localhost is the default value for 2nd argument
//memiliki 3 argument: 1. port, 2.hostname, 3. func
//localhost sm spt nama domain tp ke komputer kita sendiri
//port sm spt pintu utk komunikasi di internet
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});

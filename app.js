const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render("home");
})

app.get('/kharchabook', (req, res) => {
  fs.readdir("./files", (err, files)=> {
  if(err) throw err;
  else
    res.render("files", {files});
})
})

app.get('/create', (req, res) => {
  res.render("create");
})

app.post('/create', (req, res) => {
  console.log(req.body.filedata);
  console.log(req.body.date);

  fs.writeFile(`./files/${req.body.date}`, req.body.filedata, (err) => {
    if(err) throw err;
    res.redirect("/kharchabook");
  })
})


app.get('/edit/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if(err) throw err;
    res.render("edit", {data, filename:req.params.filename});
  })
})

app.post('/edit/:filename', (req, res) => {
  fs.writeFile(`./files/${req.params.filename}`, req.body.filedata, (err) => {
    if(err) throw err;
    res.redirect("/");
  })
})

app.get('/delete/:filename', (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, (err) => {
    if(err) throw err;
    res.redirect("/kharchabook");
  });
})

app.get('/open/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
    res.render("openfile", {filename:req.params.filename, data});
  })
})


app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
})
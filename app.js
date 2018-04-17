const express = require('express')
const multer = require('multer');
const fs = require('fs');
const pug = require('pug');
const upload = multer({ dest: 'public/uploads' })

const port = 3000;
const app = express()

const uploaded_files = [];

app.use('/public', express.static('./public'));
app.use(express.static('./public/uploads/'))
app.set('views', './views');
app.set('view engine', 'pug');

// Question: why are we specifying a destination with upload then using express static

app.get('/', (req, res) => {
    const path = './public/uploads';

    fs.readdir(path, function(err, items) {
        res.render('index', {
            cat: 'cat',
            pictures: items
        });
    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.render('upload', {
        fileToUpload: req.file.filename
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
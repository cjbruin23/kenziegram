const express = require('express')
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' })

const port = 3000;
const app = express()

const uploaded_files = [];

app.use('/public', express.static('./public'));

// Question: why are we specifying a destination with upload then using express static

app.get('/', (req, res) => {
    const path = './public/uploads';
    fs.readdir(path, function(err, items) {
        let string = '';
        for (let i = 0; i < items.length; i++) {
            string += `<img src=${path}/${items[i]} alt='img${i}'><br>`
        };
        res.send(string);
    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    let string = '';
    string += `<img src=./public/uploads/${req.file.filename} alt='img${req.file.filename}'>`
    string += `<button onclick='goBack()'>Go Back</button>`;
    string += `<script> const goBack = () => {window.history.back();}</script>`
    res.send(string);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
const express = require('express');
const bodyParser = require('body-parser');
const inquirer = require('inquirer');
var qr = require('qr-image');
const fs = require('fs');
const app = express();

app.use(express.static("public"));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'url?',
    },
  ])
  .then(answers => {
    console.log('givenUrl:', answers.name);

    const url = answers.name;
    var qr_svg = qr.image(url);
    qr_svg.pipe(require('fs').createWriteStream('qr_img.png'));

    fs.writeFile("URL.txt" , url , (err) =>{
        if (err) throw err;
    });
  })
  .catch(error => {
    console.error('Hata:', error);
  });


 

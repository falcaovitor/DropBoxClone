var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res, next) => {
  let form = new formidable.IncomingForm({
    uploadDir: './uploads',
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) => {
    res.json({
      files
    });
  });
});

router.delete('/file', (req, res, next) => {
  let form = new formidable.IncomingForm({
    uploadDir: './uploads',
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) => {
    let path = './'+fields.path;
    if(fs.existsSync(path)){
      fs.unlink(path, err => {
        if(err){
          res.status(400).json({err});
        }else{
          res.json({fields});
        }
      })
    }else{
      res.status(400).json({
        error: err
      });
    }
  });
});

router.get('/file', (req, res, next) => {
  let path = './'+req.query.path;
  if(fs.existsSync(path)){
    fs.readFile(path, (err, data) => {
      if(err){
        res.status(400).json({err});
      }else{
        res.status(200).end(data);
      }
    });
  }else{
    res.status(400).json({
      error: 'file not found'
    });
  }
});

module.exports = router;

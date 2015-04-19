var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { page: 'home' });
});

/* GET home page. */
router.get('/map', function(req, res, next) {
  res.render('layout', { page: 'map' });
});

router.get('/about', function(req, res, next) {
  res.render('layout', { page: 'about' });
});

router.get('/agreements', function(req, res, next) {
  res.render('layout', { page: 'agreements' });
});

router.get('/lawyers', function(req, res, next) {
  res.render('layout', { page: 'lawyers', apiUrl: config.apiUrl });
});

router.get('/privacy', function(req, res, next) {
  res.render('layout', { page: 'privacy' });
});

module.exports = router;

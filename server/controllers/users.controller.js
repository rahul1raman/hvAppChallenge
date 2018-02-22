var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

//routes
router.post('/authenticate', authenticate);
router.get('/current', getCurrent);
router.post('/save', saveInfo);

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
               .then(function(user){
                    if(user){
                        // success
                        res.send(user);
                    }else {
                        //failed
                        res.status(400).send('Username or password incorrect');
                    }
               })
               .catch(function(err){
                res.status(400).send(err);
               });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
               .then(function(user){
                   if(user){
                       res.send(user);
                   }else {
                       res.sendStatus(404);
                   }
               })
               .catch(function(err){
                  res.status(400).send(err);
               });
}

function saveInfo(req, res) {
    userService.saveInfo(req.body.firstname, req.body.lastname)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

 
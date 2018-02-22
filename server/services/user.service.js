var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};
 
service.authenticate = authenticate;
service.getById = getById;
service.saveInfo = saveInfo;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();
 
    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user && bcrypt.compareSync(password, user.hash)) {
            // authenticated
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
 
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function saveInfo(firstname, lastname) {
    var deferred = Q.defer();
    //console.log('msg from server ' + firstname + " " + lastname);

    var set = {
        firstName: firstname,
        lastName: lastname,
    };
    db.users.findOne({username: rahul}, function(err, user){
        if (err) deferred.reject(err.name + ': ' + err.message);
        if(user){
            db.users.insert(
                user,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
    
                    deferred.resolve();
                });
        }
    });
}

function saveInfo(firstname, lastname) {
    var deferred = Q.defer();
    _id = '5a8e9b56b63eab4882c1f5aa';
    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: 'raman' }, // hardcoded the user name, can modify this query
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    updateUser();
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: firstname,
            lastName: lastname,
        };

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

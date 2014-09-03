var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser());

// Add database: mongoose
var prodDB = "mongodb://<dbuser>:<dbpassword>@ds063909.mongolab.com:63909/pulsebond";
var devDB = "mongodb://localhost/pulsebond";

mongoose.connect(devDB);

var User = mongoose.model('User', { email: String });

app.post('/signup', function (req, res, next) {
    var email = req.body.email;

    User.findOne({ email: email }, function (err, found) {
        if (err) {
            throw err;
        }

        if (found) { // this email is already in used
            res.send({ success: false, message: 'This email has already been registered!!' });
            return;
        }

        var user = new User({ email: email });

        user.save(function (err) {
            if (err) {
                console.log('meow');
                res.send({ success: false });
            }

            res.send({ success: true });
        });
    });



});


app.listen(3000);
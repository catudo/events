
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = '10';

module.exports = function (dbs) {

    var userSchema = mongoose.Schema({
        names: {
            type: String, required: true
        },
        email: {
            type: String, required: true, unique: true, trim: true, lowercase: true
        },
        password: {
            type: String, required: true
        }
    }, {timestamps: true});

    var progress = function () {
    };

    userSchema.pre("save", function (done) {
        var user = this;
        if (!user.isModified("password")) {
            return done();
        }

        bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, progress, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                done();
            });
        });
    });

    userSchema.methods.validPassword = function (guess, done) {
        bcrypt.compare(guess, this.password, function (err, res) {
            done(err, res);
        });
    };


    if (dbs.dbMaster.models.User) {
        return dbs.dbMaster.models.User;
    }
    var User = dbs.dbMaster.model("User", userSchema);
    return User;
};

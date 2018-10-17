let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

UserSchema.statics.verify = function(userID, callback){
    User.findById(userID)
        .exec(function (error, user) {
            if (error) {
                return callback(false);
            } else {
                if (user === null) {
                    return callback(false);
                } else {
                    return callback(true);
                }
            }
        });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});


let User = mongoose.model('User', UserSchema);
module.exports = User;
const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
//import { Schema, model } from 'mongoose';

// Schema to create User model 
const userSchema = new Schema ({
    username:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
        type: String, 
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }, 
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


userSchema.pre('save', async function (next) {
    if( this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);


module.exports = User; 
const { ObjectID } = require('bson');
const mongoose = require('mongoose')
let Schema = mongoose.Schema;

const login = new Schema({
    password: String,
    admin: Boolean,
    username: String,
    email: String,
    fName: String,
    lName: String,
    addLine1: String,
    addLine2: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    countryCode: String,
    phone: String,
    _id: ObjectID
}, { collection: 'Medical', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = Login = mongoose.model('MedicalDatabase', login)
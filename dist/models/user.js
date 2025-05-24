"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: [true, 'firstname is required'],
        maxLen: 50,
    },
    lastname: {
        type: String,
        maxLen: 100
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    passwordhash: String
}, { timestamps: true });
// UserSchema.virtual('password')
// .set(function(value:any){
//   this._password = value;
// })
// .get(function(){
//   return this._password
// })
UserSchema.methods.hashIt = async function (password) {
    const salt = await bcrypt_1.default.genSalt(6);
    this.passwordhash = await bcrypt_1.default.hash(password, salt);
};
exports.User = mongoose_1.default.model('user', UserSchema);

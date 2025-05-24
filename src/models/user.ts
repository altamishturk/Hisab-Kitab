import mongoose from "mongoose";
import bcrypt from "bcrypt";



const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true,'firstname is required'],
    maxLen: 50,
  },
  lastname: {
    type: String,
    maxLen: 100
  },
  email: {
    type: String,
    required: [true,'email is required'],
    unique: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  passwordhash: String
},{timestamps: true});



// UserSchema.virtual('password')
// .set(function(value:any){
//   this._password = value;
// })
// .get(function(){
//   return this._password
// })



UserSchema.methods.hashIt = async function(password:string){
  const salt = await bcrypt.genSalt(6);
  this.passwordhash = await bcrypt.hash(password, salt);
}




export const User = mongoose.model('user', UserSchema);
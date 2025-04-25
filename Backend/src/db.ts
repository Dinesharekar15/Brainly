import mongoose,{model,Schema,Document} from "mongoose";
// import {config} from "./config"
import dotenv from 'dotenv'
dotenv.config()
const MONGODB_URI:any=process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Error:", err));


  
  interface IUser extends Document {
    username: string;
    password: string;
  }
  
  const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
  });
  
  export const UserModel = mongoose.model<IUser>("User", UserSchema);
  

const ContentSchema= new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'tag'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',require:true}
})

const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',require:true,unique:true}
})
export const ContentModel=model("Content",ContentSchema)
export const LinkModel=model("Link",LinkSchema)

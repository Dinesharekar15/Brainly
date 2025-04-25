declare global {
  namespace Express {
    export interface Request {
      userId:string
    }
  }
}

import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userAuth } from "./middelware"
import { config } from "./config"
import {ContentModel,UserModel,LinkModel} from "./db"
import {z} from "zod"
import { HashString } from "./utils"



const app=express();
app.use(express.json());
app.use(cors())
const userSchema=z.object({
    username:z.string().min(3),
    password:z.string().min(6)
})
type finalUserSchema=z.infer<typeof userSchema>;


app.post("/api/v1/signup", async (req, res) => {
    const result = userSchema.safeParse(req.body);
    console.log(req.body)
    if (!result.success) {
      console.log(result.error.format());
      res.status(400).json({ msg: "provide valid data" });
      return;
    }
  
    const user: finalUserSchema = result.data;
    const { username, password } = user;
  
    try {
  
      const hashedPassword = await bcrypt.hash(password, 10); // ✅ await
      const user= await UserModel.create({
        username,
        password: hashedPassword,
      });
  
      const token = jwt.sign({
        id:user._id
      },config.JWT_SECRET);
  
      res.json({
        msg: "user created successfully!",
        token, // ✅ optional: return token to log in automatically
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "something went wrong" }); // use 500 for server errors
    }
  });

app.post("/api/v1/signin",async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password)
  
    try {
      const user = await UserModel.findOne({ username });
  
      if (!user || !user.password) {
         res.status(404).json({ msg: "Invalid username or password" });
         return
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         res.status(401).json({ msg: "Invalid username or password" });
         return
      }
  
      const token=jwt.sign({
        id:user._id,

      },config.JWT_SECRET)
  
      res.status(202).json({
        msg: "Logged in successfully",
        token: token,
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        msg: "Something went wrong",
      });
    }
  });


app.post("/api/v1/content",userAuth,async (req,res)=>{
    const {link,title,type}=req.body;

    try {
         await  ContentModel.create({
            link,
            title,
            tags:[],
            type,
            userId:req.userId
        
        })
        res.json({
            message: "Content added"
        })
    } catch (error) {
         res.json({
            msg:"Content not created"
        })
        return
    }
    
})



app.get("/api/v1/content",userAuth,async(req,res)=>{
    
    const userId=req.userId;
    // console.log(userId)
    if (!userId) {
         res.status(401).json({ msg: "Unauthorized" });
         return
    }
    
    const content=await ContentModel.find({
        userId:userId
    }).populate("userId","username")
    res.json({
        content
    })
})

app.delete("/api/v1/content",userAuth,async(req,res)=>{
    const contentID=req.body.contentId;
    await ContentModel.deleteMany({
        _id:contentID,
        userId:req.userId
    })
    res.json({
        msg:"Content deleted Successufully"

    })
})

app.post("/api/v1/brain/share", userAuth,async(req,res)=>{
  const share=req.body.share;
  if(share){
    const existinguserLink=await LinkModel.findOne({
      userId:req.userId
    })
    if(existinguserLink){
      res.json({
        Link:existinguserLink.hash
      })
      return
    }
    let str=HashString(10);
    await LinkModel.create({
      hash:str,
      userId:req.userId
    })
    res.json({
      Link:str
    })
    return
  }else{
    await LinkModel.deleteOne({
      userId:req.userId
    })
  }

  res.json({
    Meg:"Updated the shared link"

  })
})

app.get("/api/v1/brain/:Link",async(req,res)=>{
  const sharedLink=req.params.Link
  const Link=await LinkModel.findOne({
    hash:sharedLink
  })
  if(!Link){
    res.json({
      msg:"Please Provide valid link"
    })
    return
  }
  const Content=await ContentModel.find({
    userId:Link.userId
  })
  
  const User=await UserModel.findOne({
    _id:Link.userId
  })
  if(!User){
    res.json({
      Msg:"user not found shoulde not be the error here"
    })
    return
  }

  res.json({
    username:User.username,
    Content:Content
  })
})

app.listen(config.PORT,()=>{
    console.log("server is running on port")
})
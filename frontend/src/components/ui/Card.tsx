import { ReactElement } from "react";
import Delteicon from "../../assets/Delete";
import { Shareicon } from "../../assets/Shareicon";
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
import axios from "axios";
interface cardprops {
  title: string;
  icon: ReactElement;
  link: string;
  type: string; //here shoulde be the "youtube" | "twitter"
  contentID?:string
}

const Card = (prop: cardprops) => {
  return (
    <div className=" p-4 max-w-78 border-1 bg-white border-gray-200 rounded-md">
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-4">
          <span>{prop.icon}</span>
          <h3 className="text-2xl font-semibold">{prop.title}</h3>
        </div>
        <div className="text-gray-400 flex gap-2">
         
            <span className="cursor-pointer" onClick={async()=>{
              await axios.delete(BACKEND_URL+"/api/v1/content",{
                data:{
                  contentId:prop.contentID
                },headers:{
                  Authorization:localStorage.getItem("token")
                }
              })
              alert("content deleted")
            }}>
              <Delteicon />
            </span>
        
         
            <span className="cursor-pointer">
              <Shareicon size="lg" />
            </span>
         
        </div>
      </div>
      <div className="aspect-w-16 aspect-h-9 mb-4 mt-6">
        {prop.type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={prop.link}></a>
          </blockquote>
        )}
        {prop.type === "youtube" && (
          <iframe
            className="w-full h-full rounded-lg"
            src={prop.link}
            title="YouTube video player"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Card;

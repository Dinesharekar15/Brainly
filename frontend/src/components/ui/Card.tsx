import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Delteicon from "../../assets/Delete";
import { Shareicon } from "../../assets/Shareicon";
interface cardprops {
  title: string;
  icon: ReactElement;
  link: string;
  type: "twitter" | "youtube";
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
          <Link to="/delete">
            <span>
              <Delteicon />
            </span>
          </Link>
          <Link to="/share">
            <span>
              <Shareicon size="lg" />
            </span>
          </Link>
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

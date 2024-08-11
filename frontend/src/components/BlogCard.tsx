import { Heading } from "./Heading";
import { ClockCircleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
type blogCardType = {
  id: string;
  name?: string;
  title: string;
  content: string;
};
export const BlogCard = ({ id, name, title, content }: blogCardType) => {
   
  return (
    <Link to={`/blog/${id}`} className="cursor-default">
      <div className="flex flex-col items-center w-full">
        <div className="m-4 w-5/12  cursor-pointer">
          <div className="flex items-center">
            <div className="mr-2 relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
              <span className="font-homo font-medium text-xs text-gray-600 dark:text-gray-300">
                JL
              </span>
            </div>
            <div className="font-homo text-sm ">{name}</div>
          </div>
          <div>
            <Heading text={title}></Heading>
            <div className="font-homo text-gray-600">
              {content.length >= 100 ? content.slice(0, 100) + " ..." : content}
            </div>
          </div>
          <div className="flex items-center my-4">
            <ClockCircleOutlined style={{ color: "rgb(71 85 105)" }} />
            <div className="ml-2 font-homo text-sm">2 Jun 2024</div>
          </div>
          <div className="h-px w-full bg-gray-200 "></div>
        </div>
      </div>
    </Link>
  );
};

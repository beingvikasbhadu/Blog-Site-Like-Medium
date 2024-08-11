import { useEffect, useRef } from "react";
import "../styles/fullBlog.css";
import { Avatar } from "./Avatar";
import { TextwithLink } from "./TextwithLink";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

type fullblog = {
  title: string;
  content: string;
};
export const FullBlog = ({ title, content }: fullblog) => {
  //   const [htmlContent, setHtmlContent] = useState("");
  //   useEffect(() => {
  //     const main = document.createElement("div");
  //     main.innerHTML = content;
  //     const imgs = main.querySelectorAll("img");
  //     imgs.forEach((img) => {
  //       const wrapper = document.createElement("div");
  //       wrapper.className = "img-wrapper";
  //       img.parentNode?.insertBefore(wrapper, img);
  //       wrapper.appendChild(img);
  //     });
  //     setHtmlContent(main.innerHTML);
  //   }, []);
   const ref=useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(ref.current)
    {const nodes = ref.current.querySelectorAll("code");
    nodes.forEach((node) => hljs.highlightElement(node));}
  }, []);
  return (
    <div className="mt-5 flex flex-col items-center w-full ">
      <div className="flex justify-center w-full">
        <div className="w-5/6  text-center font-bold font-homo text-5xl text-slate-950 mt-6 text-pretty">
          {title}
        </div>
      </div>
      <div className="flex justify-start  items-center w-1/2 mt-10 mb-14 text-pretty">
        <div>
          <Avatar onClick={() => {}} text="vikas"></Avatar>
        </div>
        <div className="ml-4 flex flex-col">
          <div className="text-xl">
            <TextwithLink text={"vikas bhadu"} url="#"></TextwithLink>
          </div>
          <div className="flex">
            <div className=" font-mono text-slate-400 mr-5">6 min read</div>
            <div className=" font-mono text-slate-400">2 days ago</div>
          </div>
        </div>
      </div>
      <div ref={ref}
        className="content  relative flex flex-col text-preety  text-xl font-Crimson leading-relaxed w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

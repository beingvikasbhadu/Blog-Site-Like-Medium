import { useNavigate } from "react-router-dom";

type textwithLinkType = {
  text?: string;
  link?: string;
  url: string;
};
export const TextwithLink = ({ text, link, url }: textwithLinkType) => {
    const navigate=useNavigate();
  return (
    <div className="font-mono text-slate-700">
      {text}{" "}
      <a href={url} className="underline" onClick={()=>navigate(url)}>
        {link}
      </a>
    </div>
  );
};

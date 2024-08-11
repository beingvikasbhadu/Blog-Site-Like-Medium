import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_url } from "../config";
import dompurify from "dompurify";
import { CreatePostInput } from "@vikas_bhadu/common";
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  BlogIdFilterAtom,
  FilteredBlogSelector,
} from "../store/atoms/BlogsAtom";
import { useParams } from "react-router-dom";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";


const MyBlogs = () => {
  const blog= useRecoilValue(FilteredBlogSelector);
  const [blogsId,setIds] = useRecoilState(BlogIdFilterAtom);
  const { id }: { id?: string } = useParams();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(blogsId!=id)
      {console.log("SET ID RUNS")
        setIds((val) =>id || "");}
      setLoading(false);
    
  }, []);
  console.log("blog[]:",blog);
  if (loading || blog.length == 0)
    return (
      <>
        <AppBar></AppBar>
        <FullBlogSkeleton></FullBlogSkeleton>
      </>
    );
  return (
    <div>
      <AppBar></AppBar>
      <FullBlog
        key={blog[0].id}
        title={blog[0].title}
        content={dompurify.sanitize(blog[0].content)}
      ></FullBlog>
    </div>
  );
};

export default MyBlogs;

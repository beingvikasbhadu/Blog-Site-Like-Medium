import { useEffect, useRef, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import axios from "axios";
import { Backend_url } from "../config";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { BlogsAtom } from "../store/atoms/BlogsAtom";
import { useRecoilState } from "recoil";
import useScrollRestoration from "../hooks/scrollRestoration";

type blogType = {
  id: string;
  title: string;
  content: string;
};

const Dashboard = () => {
  const scrollPos = useScrollRestoration();

  const [blogs, setBlogs] = useRecoilState(BlogsAtom);
  const [lastScroll, setLastScroll] = useState(0);
  const [n_scrolled, setN_Scrolled] = useState(1);
  useEffect(() => {
    console.log("hook trieggered");
    let handler: number;
    if (!blogs.data.length || n_scrolled != 1) {
      handler = setTimeout(() => {
        axios
          .get(`${Backend_url}/api/v1/blog/bulk`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then((res) => {
            setBlogs((val) => {
              return { data: [...val.data, ...res.data], loading: false };
            });
          });
      }, 1 * 1000);

      //   setBlogs((val) => {
      //     return {
      //       data: [
      //         ...val.data,
      //         { id: "a", title: "t1", content: "afdasdf" },
      //         { id: "a", title: "t1", content: "afdasdf" },
      //         { id: "a", title: "t1", content: "afdasdf" },
      //         { id: "a", title: "t1", content: "afdasdf" },
      //         { id: "a", title: "t1", content: "afdasdf" },
      //       ],
      //       loading: false,
      //     };
      //   });
    }
    return () => {
      clearTimeout(handler);
    };
  }, [n_scrolled]);

  function infinityScroll(e) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 5) {
      console.log("scrolled!");
      setN_Scrolled((val) => val + 1);
      setBlogs((val) => {
        return { ...val, loading: true };
      });
      setLastScroll(scrollTop);
    }
  }

  return (
    <div onScroll={infinityScroll} className="h-lvh overflow-y-auto">
      <AppBar></AppBar>
      {blogs.data.map((blog: blogType) => {
        return (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            name="annoymous"
          ></BlogCard>
        );
      })}
      {blogs.loading && (
        <>
          <BlogCardSkeleton></BlogCardSkeleton>
          <BlogCardSkeleton></BlogCardSkeleton>
          <BlogCardSkeleton></BlogCardSkeleton>
          <BlogCardSkeleton></BlogCardSkeleton>
          <BlogCardSkeleton></BlogCardSkeleton>
        </>
      )}
    </div>
  );
};

export default Dashboard;

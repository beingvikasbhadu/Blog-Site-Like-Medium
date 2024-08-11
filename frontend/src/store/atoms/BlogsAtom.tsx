import { atom, selector } from "recoil";
import { Backend_url } from "../../config";
import axios from "axios";

type blogType = {
  id: string;
  title: string;
  content: string;
};
type BlogsAtom = {
  data: blogType[];
  loading: boolean;
};

export const BlogsAtom = atom<BlogsAtom>({
  key: "BlogsAtom",
  default: {
    data: [],
    loading: true,
  },
});

export const BlogIdFilterAtom = atom<string>({
  key: "filteredBlogIdAtom",
  default: "",
});

export const FilteredBlogSelector = selector<blogType[]>({
  key: "FilteredBlogSelector",
  get: async ({ get }) => {
    console.log("selector runs");
    const blogId = get(BlogIdFilterAtom);
    const blogs = get(BlogsAtom).data;
    if (blogs.length == 0 && blogId != "") {
      const res = await axios.get(`${Backend_url}/api/v1/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return [res.data];
    }
    return blogs.filter((filteredBlog) => filteredBlog.id == blogId);
  },
});

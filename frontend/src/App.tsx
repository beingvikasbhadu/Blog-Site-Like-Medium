import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadinSpinner } from "./components/LoadingSppiner";
import { BlogCardSkeleton } from "./components/BlogCardSkeleton";
import { AppBarSkelton } from "./components/AppBarSkeleton";
import { RecoilRoot } from "recoil";
import { FullBlog } from "./components/FullBlog";
import { FullBlogSkeleton } from "./components/FullBlogSkeleton";
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Blog = lazy(() => import("./pages/Blog"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const UploadBlog = lazy(() => import("./pages/UploadBlog"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));

function App() {
  return (
    <>
      {/* <AppBar></AppBar> */}
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signin"
              element={
                <Suspense fallback={<LoadinSpinner />}>
                  <Signin />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<LoadinSpinner />}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <Suspense fallback={<FullBlogSkeleton />}>
                  <MyBlogs />
                </Suspense>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <Suspense
                  fallback={
                    <>
                      <AppBarSkelton></AppBarSkelton>
                      <BlogCardSkeleton></BlogCardSkeleton>
                      <BlogCardSkeleton></BlogCardSkeleton>
                      <BlogCardSkeleton></BlogCardSkeleton>
                    </>
                  }
                >
                  <Dashboard />
                </Suspense>
              }
            ></Route>

            <Route
              path="/upload-post"
              element={
                <Suspense fallback={<AppBarSkelton />}>
                  <UploadBlog />
                </Suspense>
              }
            ></Route>
            <Route
              path="/my-blogs"
              element={
                <Suspense fallback={"loading..."}>
                  <MyBlogs />
                </Suspense>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
